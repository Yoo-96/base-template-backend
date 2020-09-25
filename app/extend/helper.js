'use strict';

module.exports = {
  /**
   * 业务处理正常
   * @param {Object} ctx - context
   * @param {*} data - 返回的数据
   */
  success(ctx, data) {
    ctx.body = data;
    ctx.status = 200;
  },

  /**
   * 业务处理异常
   * @param {*} ctx - context
   * @param {Object} data - 返回的数据
   */
  fail(ctx, data) {
    ctx.body = data;
    ctx.status = 400;
  },
};
