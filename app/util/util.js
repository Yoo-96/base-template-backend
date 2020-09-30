'use strict';
const _ = require('lodash');

_.mixin({
  toPairsDeep: obj => _.flatMap(
    _.toPairs(obj), ([ k, v ]) =>
      (_.isObjectLike(v) ? _.toPairsDeep(v) : [[ k, v ]])),
});


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
  populatePropertiesFromArray,
};
