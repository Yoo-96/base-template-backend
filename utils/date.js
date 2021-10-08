/**
 *@BelongsProject: base-template-backend
 *@Author: yoo
 *@CreateTime: 2021-09-30 10:58
 *@Description: 日期工具类
 */
'use strict';

/**
 * 获取当前年份
 * @returns {number} 返回当前年份
 */
const getYear = () => {
  const now = new Date();
  return now.getFullYear();
};

/**
 * 获取当前月份
 * @returns {number} 返回当前月份
 */
const getMonth = () => {
  const now = new Date();
  const month = now.getMonth() + 1;
  return month < 10 ? `0${month}` : month;
};

/**
 * 获取当前天
 * @returns {number} 返回当前天
 */
const getDate = () => {
  const now = new Date();
  const date = now.getDate();
  return date < 10 ? `0${date}` : date;
};

/**
 * 获取完整年月日
 * @param {string} separator 分隔符
 * @returns {string} 返回完整年月日
 */
const getCurrentDate = (separator = '') => {
  return `${getYear()}${separator}${getMonth()}${separator}${getDate()}`;
};

const getTimestamp = () => {
  return (new Date()).valueOf();
};

module.exports = {
  getYear,
  getMonth,
  getDate,
  getCurrentDate,
  getTimestamp,
};
