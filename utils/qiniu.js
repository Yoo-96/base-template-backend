/**
 *@BelongsProject: base-template-backend
 *@Author: yoo
 *@CreateTime:
 *@Description: 七牛
 */
'use strict';
const qiniu = require('qiniu');

/**
 * 获取七牛云上传token
 * @param {*} app app实例
 * @return {*} 返回token
 */
const getQiniuUploadToken = app => {
  const accessKey = app.config.qiniu.accessKey;
  const secretKey = app.config.qiniu.secretKey;
  const bucket = app.config.qiniu.bucket;

  const mac = new qiniu.auth.digest.Mac(accessKey, secretKey);
  const options = {
    scope: bucket,
    expires: 7200,
  };
  const putPolicy = new qiniu.rs.PutPolicy(options);
  return putPolicy.uploadToken(mac);
};


module.exports = {
  getQiniuUploadToken,
};
