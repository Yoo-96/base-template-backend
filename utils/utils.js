'use strict';

module.exports = {
  // 数字转换-多用于入参string转换int
  toInt: function (str) {
    if (typeof str === 'number') return str;
    if (!str) return str;
    return parseInt(str, 10) || 0;
  },
};
