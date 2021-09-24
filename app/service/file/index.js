'use strict';
const Controller = require('egg').Controller;
const qiniu = require('qiniu');
const { createWriteStream, createReadStream, unlinkSync } = require('mz/fs');
const awaitWriteStream = require('await-stream-ready').write;
const sendToWormhole = require('stream-wormhole');
const { getQiniuUploadToken } = require('../../../utils/qiniu');
const { getCosToken } = require('../../../utils/cos');
const { getFileHashName, getFilePath, checkFileExisted } = require('../../../utils/file');

class FileController extends Controller {
  // 七牛云文件上传
  async uploadToQiniu(file) {
    const { app, logger } = this;

    const stream = createReadStream(file.filepath);
    const { fileName } = await getFileHashName(file);
    const localFile = getFilePath(app, fileName, 'qiniu');

    // 获取token
    const uploadToken = getQiniuUploadToken(app);

    const config = new qiniu.conf.Config();
    config.zone = qiniu.zone.Zone_z2;

    try {
      // 写入本地临时文件
      const writeStream = createWriteStream(localFile);
      await awaitWriteStream(stream.pipe(writeStream));

      const formUploader = new qiniu.form_up.FormUploader(config);
      const putExtra = new qiniu.form_up.PutExtra();

      // 上传七牛云
      return await new Promise((resolve, reject) => {
        formUploader.putFile(uploadToken, null, localFile, putExtra, function(respErr, respBody, respInfo) {
          unlinkSync(localFile);
          if (respErr) {
            reject(respErr);
          }
          logger.info('qiniu upload write fail success: %s ', respInfo);
          if (respInfo.statusCode === 200) {
            const previewUrl = `${app.config.qiniu.domainName}${respBody.key}`;
            resolve({ fileName, previewUrl });
          } else {
            reject(respInfo);
          }
        });
      });
    } catch (e) {
      logger.info('qiniu upload write fail err: %s ', e);
      await sendToWormhole(stream);
      return false;
    }
  }
  // 上传本地
  async uploadToLocal(file, type) {
    const { app, logger } = this;

    const stream = createReadStream(file.filepath);

    const { fileName, fileHash } = await getFileHashName(file);
    const localFile = getFilePath(app, fileName, type);

    const isFileExisted = await checkFileExisted(localFile, fileHash);
    const previewUrl = app.config.image_preview_url + '?file=' + fileName; // 图片预览地址

    // 判断文件是否已存在
    if (!isFileExisted) {
      try {
        return await new Promise((resolve, reject) => {
          const writerStream = createWriteStream(localFile);
          stream.pipe(writerStream);
          let errFlag;
          // 写入失败
          writerStream.on('error', err => {
            logger.info('uploadImage is error err: %s ', err);
            errFlag = true;
            sendToWormhole(stream);
            writerStream.destroy();
            reject(err);
          });

          // 写入完成
          writerStream.on('finish', () => {
            if (errFlag) return;
            resolve({ fileName, previewUrl });
            logger.info('local write success fileName: %s ', fileName);
          });
        });
      } catch (e) {
        await sendToWormhole(stream);
        return false;
      }
    } else {
      await sendToWormhole(stream);
      logger.info('uploadImage image is exist fileName: %s ', fileName);
      return { fileName, previewUrl };
    }
  }
  // 腾讯cos文件上传
  async uploadToCOS(file) {
    const { app, logger } = this;

    const stream = createReadStream(file.filepath);
    const { fileName } = await getFileHashName(file);
    const localFile = getFilePath(app, fileName, 'cos');

    const cos = getCosToken(app);

    try {
      // 写入本地临时文件
      const writeStream = createWriteStream(localFile);
      await awaitWriteStream(stream.pipe(writeStream));

      return await new Promise((resolve, reject) => {
        cos.sliceUploadFile({
          Bucket: app.config.cos.Bucket,
          Region: app.config.cos.Region,
          Key: fileName,
          FilePath: localFile,
        }, function(err, res) {
          unlinkSync(localFile);
          if (err || res.statusCode !== 200) {
            reject(err || res);
          } else {
            logger.info('cos upload write fail success: %s ', res);
            const previewUrl = app.config.image_preview_cos_url + '?file=' + res.Key;
            resolve(previewUrl);
          }
        });
      });
    } catch (e) {
      logger.info('cos upload write fail err: %s ', e);
      await sendToWormhole(stream);
      return false;
    }
  }
  // 腾讯cos图片预览
  async imagePreviewToCOS(fileName) {
    const { app, logger } = this;

    const cos = getCosToken(app);
    const localFile = getFilePath(app, fileName, 'cos');

    try {
      return await new Promise((resolve, reject) => {
        cos.getObject({
          Bucket: app.config.cos.Bucket,
          Region: app.config.cos.Region,
          Key: fileName,
          Output: createWriteStream(localFile),
        }, function(err, res) {
          if (err || res.statusCode !== 200) {
            reject(err || res);
          } else {
            logger.info('cos preview write fail success: %s ', res);
            resolve(res);
          }
        });
      });
    } catch (e) {
      logger.info('cos preview fail err: %s ', e);
      return e;
    }
  }
}

module.exports = FileController;
