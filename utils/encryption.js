const crypto = require('crypto');


/**
 * hash方法
 * @param {string} method 加密方式
 * @param {string} text 原始字符串
 * @param {string} format 格式
 * @returns {string} 加密后字符串
 */
const hash = (method, text, format) => {
  let sum = crypto.createHash(method);
  sum.update(text);
  return sum.digest(format || 'hex');
};

/**
 * md5加密方式
 * @param {Object} app
 * @param {string} text 原始字符串
 * @param {string} format 格式
 * @returns {string} 加密后字符串
 */
const md5 = (app, text, format = 'hex') => {
  const saltText = text + app.config.salt;
  return hash('md5', saltText, format);
};

module.exports = {
  md5,
};
