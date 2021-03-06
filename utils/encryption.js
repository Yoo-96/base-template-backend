/**
 *@BelongsProject: base-template-backend
 *@Author: yoo
 *@CreateTime:
 *@Description: crypto加密公共函数
 */
'use strict';
const crypto = require('crypto');

/**
 * hash方法
 * @param {string} method 加密方式
 * @param {string} text 原始字符串
 * @param {string} format 格式
 * @return {string} 加密后字符串
 */
const hash = (method, text, format) => {
  const sum = crypto.createHash(method);
  sum.update(text);
  return sum.digest(format || 'hex');
};

/**
 * md5加密方式
 * @param {*} app app实例
 * @param {string} text 原始字符串
 * @param {string} format 格式
 * @return {string} 加密后字符串
 */
const md5 = (app, text, format = 'hex') => {
  const saltText = text + app.config.salt;
  return hash('md5', saltText, format);
};

module.exports = {
  md5,
};
