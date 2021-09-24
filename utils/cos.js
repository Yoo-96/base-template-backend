'use strict';
const COS = require('cos-nodejs-sdk-v5');

/**
 * 获取cos密钥
 * @param {*} app app实例
 * @return {COS} cos
 */
const getCosToken = app => {
  return new COS({
    AppId: app.config.cos.AppId,
    SecretId: app.config.cos.SecretId,
    SecretKey: app.config.cos.SecretKey,
  });
};


module.exports = {
  getCosToken,
};
