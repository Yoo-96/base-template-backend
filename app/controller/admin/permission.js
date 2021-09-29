/**
 * @Controller 管理端-权限模块
 *@BelongsProject: base-template-backend
 *@Author: yoo
 *@CreateTime:
 *@Description: 管理端 - 权限模块
 */
'use strict';
const Controller = require('egg').Controller;

class PermissionController extends Controller {
  /**
   * @router get /api/v1/admin/permission
   * @summary 权限列表
   * @description 用户列表
   * @request query integer *currentPage 当前页码
   * @request query integer *pageSize 分页条数
   * @response 200 adminPermissionQueryResponse
   */
  async query() {
    const { ctx } = this;
    const {
      current = 1,
      pageSize = 20,
      name = '',
      code = '',
      status,
    } = ctx.query;
    const result = await ctx.service.admin.permission.query({ current, pageSize, name, code, status });

    if (result) {
      return ctx.helper.success(ctx, result);
    }
    ctx.helper.fail(ctx, {
      msg: '获取权限列表失败',
    });
  }

  /**
   * @router post /api/v1/admin/permission
   * @summary 创建权限
   * @description 创建权限
   * @request body adminPermissionCreateRequest *body
   * @response 200 baseResponse
   */
  async create() {
    const { ctx } = this;
    const {
      code,
      name,
      description,
      status,
    } = ctx.request.body;
    const data = {
      code,
      name,
      description,
      status,
      createUser: ctx.session.currentUser.id,
    };
    const { isOK, msg } = await ctx.service.admin.permission.create(data);
    if (!isOK) {
      return ctx.helper.fail(ctx, { msg });
    }
    ctx.helper.success(ctx, 'success');
  }
  /**
   * @router put /api/v1/admin/permissions
   * @summary 修改权限
   * @description 修改权限
   * @request body adminPermissionUpdateRequest *body
   * @response 200 baseResponse
   */
  async update() {
    const { ctx } = this;
    const {
      id,
      code,
      name,
      description,
      status,
    } = ctx.request.body;
    const data = {
      id,
      code,
      name,
      description,
      status,
      updateUser: ctx.session.currentUser.id,
    };
    const { isOK, msg } = await ctx.service.admin.permission.update(data);
    if (!isOK) {
      return ctx.helper.fail(ctx, { msg });
    }
    ctx.helper.success(ctx, 'success');
  }
  /**
   * @router delete /api/v1/admin/permissions/{id}
   * @summary 删除权限
   * @description 删除权限
   * @request path string *id 权限ID
   * @response 200 baseResponse
   */
  async remove() {
    const { ctx } = this;
    const { id } = ctx.params;
    const result = await ctx.service.admin.permission.remove(id);
    ctx.helper.success(ctx, 'success', result);
  }
}

module.exports = PermissionController;
