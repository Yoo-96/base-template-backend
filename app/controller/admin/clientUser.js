/**
 *@BelongsProject: base-template-backend
 *@Author: yoo
 *@CreateTime: 2021-09-26 16:48
 *@Description: 管理端 - 客户端用户管理
 */
'use strict';
const Controller = require('egg').Controller;

class ClientUserController extends Controller {
  // 用户列表
  async query() {
    const { ctx } = this;
    const { currentPage = 1, pageSize = 20 } = ctx.query;
    const result = await ctx.service.admin.clientUser.query({ pageSize, currentPage });

    if (result) {
      return ctx.helper.success(ctx, result);
    }
    ctx.helper.fail(ctx, {
      msg: '获取用户列表失败',
    });
  }
  // 启用、禁用用户
  async updateUserStatus() {
    const { ctx } = this;
    const { id } = ctx.params;
    const result = await ctx.service.admin.clientUser.updateUserStatus(id);
    if (!result) {
      return ctx.helper.fail(ctx, {
        msg: '修改失败',
      });
    }
    return ctx.helper.success(ctx);
  }
}

module.exports = ClientUserController;
