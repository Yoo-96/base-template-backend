/**
 *@BelongsProject: base-template-backend
 *@Author: yoo
 *@CreateTime:
 *@Description: 公共方法
 */
'use strict';
const _ = require('lodash');
const uuidv1 = require('uuid/v1');

_.mixin({
  toPairsDeep: obj => _.flatMap(
    _.toPairs(obj), ([ k, v ]) =>
      (_.isObjectLike(v) ? _.toPairsDeep(v) : [[ k, v ]])),
});

/**
 * 数字转换-多用于入参string转换int
 * @param {string} str 原始字符串
 * @return {number} 放回转换后的结果
 */
const toInt = str => {
  if (typeof str === 'number') return str;
  if (!str) return str;
  return parseInt(str, 10) || 0;
};

/**
 * 从多维数组中找出匹配 key 值的所有属性的值
 * @param {array} arr 原始数组
 * @param {string} key 需要匹配的 key
 * @return {*} 返回结果
 */
const populatePropertiesFromArray = (arr, key) => {
  return _(arr)
    .toPairsDeep()
    .filter(([ k ]) => k === key)
    .map(1)
    .value();
};

/**
 * 生成UUID
 * @returns {*} 返回生成UUID
 */
const generateUUID = () => {
  return uuidv1();
};

module.exports = {
  toInt,
  populatePropertiesFromArray,
  generateUUID,
};
