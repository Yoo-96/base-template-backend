/**
 * @Controller 管理端-客户端用户管理
 *@BelongsProject: base-template-backend
 *@Author: yoo
 *@CreateTime: 2021-09-26 16:48
 *@Description: 管理端 - 客户端用户管理
 */
'use strict';
const Controller = require('egg').Controller;

class ClientUserController extends Controller {
  /**
   * @router get /api/v1/admin/clientUser
   * @summary 用户列表
   * @description 用户列表
   * @request query integer *currentPage 当前页码
   * @request query integer *pageSize 分页条数
   * @response 200 adminUserQueryResponse
   */
  async query () {
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
  /**
   * @router put /api/v1/admin/clientUser/{id}/status
   * @summary 启用、禁用用户
   * @description 启用、禁用用户
   * @request path string *id 用户ID
   * @response 200 baseResponse
   */
  async updateUserStatus () {
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
