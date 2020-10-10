'use strict';
const _ = require('lodash');

_.mixin({
  toPairsDeep: obj => _.flatMap(
    _.toPairs(obj), ([ k, v ]) =>
      (_.isObjectLike(v) ? _.toPairsDeep(v) : [[ k, v ]])),
});

/**
 * 数字转换-多用于入参string转换int
 * @param str
 * @returns {number}
 */
const toInt = (str) => {
  if (typeof str === 'number') return str;
  if (!str) return str;
  return parseInt(str, 10) || 0;
};

/**
 * 从多维数组中找出匹配 key 值的所有属性的值
 * @param arr
 * @param key
 * @return {*}
 */
const populatePropertiesFromArray = (arr, key) => {
  return _(arr)
    .toPairsDeep()
    .filter(([ k ]) => k === key)
    .map(1)
    .value();
};

module.exports = {
  toInt,
  populatePropertiesFromArray,
};
