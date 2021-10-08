/**
 * @Controller 附件模块
 *@BelongsProject: base-template-backend
 *@Author: yoo
 *@CreateTime:
 *@Description: 附件模块
 */
'use strict';
const Controller = require('egg').Controller;
const mime = require('mime-types');
const sendToWormhole = require('stream-wormhole');
const { readFileSync, unlinkSync } = require('mz/fs');
const path = require('path');
const utf8 = require('utf8');
const Jimp = require('jimp');
const { AttachmentLogEnums } = require('../../../enums/AttachmentLogEnums');
const { getFilePath } = require('../../../utils/file');

class FileController extends Controller {
  /**
   * @router post /api/v1/file/uploadFile
   * @summary 附件上传
   * @description 附件上传
   * @request formData file *file 文件流
   * @response 200 imageUploadResponse
   */
  async uploadFile () {
    const { ctx, app } = this;
    const file = ctx.request.files[0];

    const createUser = ctx.session.currentUser.id;
    const fileResult = await ctx.service.file.index.uploadAttachmentToLocal(file); // 上传本地磁盘

    if (fileResult) {
      const attachmentData = {
        fileName: file.filename,
        writeInName: fileResult.writeInName,
        mimeType: file.mimeType,
        extension: fileResult.extension,
        size: fileResult.size,
        url: '',
        folderName: fileResult.folderName,
        createUser,
      };
      const attachmentRes = await ctx.service.file.attachments.saveAttachment(attachmentData);
      if (attachmentRes) {
        const id = attachmentRes.id;
        const downloadUrl = app.config.attachment_download_url + '?id=' + id; // 附件下载地址
        const logData = {
          attachmentId: attachmentRes.id,
          createUser,
          operationType: AttachmentLogEnums.CREATE,
        };
        await ctx.service.file.attachmentLog.createAttachmentLog(logData);
        return ctx.helper.success(ctx, { id, downloadUrl });
      }
    }
    ctx.helper.fail(ctx, { msg: '上传失败，请稍后重试！' });
  }
  /**
   * @router post /api/v1/file/downloadFile
   * @summary 附件下载
   * @description 附件下载
   * @request query string *id 附件ID
   */
  async downloadFile () {
    const { ctx, app } = this;
    const { id } = ctx.query;

    const attachmentDetail = await ctx.service.file.attachments.getAttachmentById(id);

    if (attachmentDetail) {
      const { fileName, writeInName, mimeType, folderName, size } = attachmentDetail;
      const logData = {
        attachmentId: id,
        createUser: ctx.session.currentUser.id,
        operationType: AttachmentLogEnums.DOWNLOAD,
      };
      await ctx.service.file.attachmentLog.createAttachmentLog(logData);

      const uploadBasePath = app.config.upload_base_path + '/local/attachments' + folderName;
      const filePath = path.join(uploadBasePath, writeInName);
      const file = readFileSync(filePath);
      ctx.set('Content-Length', size);
      ctx.set('Content-type', mimeType);
      ctx.set('Content-Disposition', `attachment; filename=${utf8.encode(fileName)}`);
      ctx.body = file;
    } else {
      ctx.helper.fail(ctx, { msg: '附件不存在' });
    }
  }

  /**
   * @router post /api/v1/file/uploadImage
   * @summary 图片上传
   * @description 图片上传
   * @request formData file *file 文件流
   * @response 200 imageUploadResponse
   */
  async uploadImage () {
    const { ctx, app } = this;
    const file = ctx.request.files[0];

    const extension = mime.extension(file.mimeType);

    const whitelist = [ 'jpg', 'jpeg', 'png', 'gif', 'bmp' ];
    if (!whitelist.includes(extension)) {
      await sendToWormhole(file);
      return ctx.helper.fail(ctx, { msg: '请上传/jpg/jpeg/png/gif/bmp格式' });
    }

    // const result = await ctx.service.file.index.uploadToQiniu(file); // 上传七牛云
    // const result = await ctx.service.file.index.uploadToCOS(file); // 上传腾讯cos
    const result = await ctx.service.file.index.uploadImageToLocal(file, 'local/images'); // 上传本地磁盘
    if (result) {
      const fileName = result.fileName;
      const previewUrl = app.config.image_preview_url + '?file=' + fileName; // 图片预览地址
      const data = { fileName, previewUrl };
      ctx.helper.success(ctx, data);
    } else {
      return ctx.helper.fail(ctx, { msg: '上传失败，请稍后重试！' });
    }
  }
  /**
   * @router post /api/v1/file/imagePreview
   * @summary 图片预览
   * @description 图片预览
   * @request query string *file 文件名
   */
  async imagePreview () {
    const { ctx, app } = this;
    let { file, type } = ctx.query;

    const uploadBasePath = 'local/images';
    const filePath = getFilePath(app, file, 'local/images');

    try {
      const mimeType = mime.lookup(filePath);

      if (type === 'thumbnail') {
        const thumbnailFilePath = getFilePath(app, file, `${uploadBasePath}/thumbnail`);

        file = readFileSync(filePath);

        const height = 200;
        const width = 200;
        let img = await Jimp.read(file);
        const originalHeight = img.getHeight();
        const originalWidth = img.getWidth();
        img = originalWidth > originalHeight ? img.resize(width, Jimp.AUTO) : img.resize(Jimp.AUTO, height);

        img.quality(100) // set JPEG quality
          .write(thumbnailFilePath); // save

        file = await img.getBufferAsync(Jimp.MIME_PNG);
      } else {
        file = readFileSync(filePath);
      }

      ctx.set('content-type', mimeType);
      ctx.body = file;
    } catch (error) {
      ctx.status = 404;
      ctx.body = '访问资源不存在';
    }
  }
  // 腾讯cos图片预览
  async imagePreviewToCOS () {
    const { ctx, app } = this;
    const { file } = ctx.query;
    const result = await ctx.service.file.index.imagePreviewToCOS(file);
    if (result.statusCode === 404) {
      ctx.status = 404;
      ctx.body = '访问资源不存在';
      return;
    }

    const uploadBasePath = app.config.upload_base_path + '/cos';
    const filePath = path.join(uploadBasePath, file);

    try {
      const mimeType = mime.lookup(filePath);
      const file = readFileSync(filePath);
      ctx.set('content-type', mimeType);
      ctx.body = file;
      unlinkSync(filePath);
    } catch (error) {
      ctx.status = 404;
      ctx.body = '访问资源不存在';
    }
  }
}

module.exports = FileController;
