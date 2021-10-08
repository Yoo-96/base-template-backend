/**
 * @Controller 管理端-角色模块
 *@BelongsProject: base-template-backend
 *@Author: yoo
 *@CreateTime:
 *@Description: 管理端 - 角色模块
 */
'use strict';
const Controller = require('egg').Controller;

class RoleController extends Controller {
  /**
   * @router get /api/v1/admin/role
   * @summary 角色列表
   * @description 角色列表
   * @request query integer *currentPage 当前页码
   * @request query integer *pageSize 分页条数
   * @response 200 adminRoleQueryResponse
   */
  async query () {
    const { ctx } = this;
    const {
      current = 1,
      pageSize = 20,
      name = '',
      code = '',
      status,
    } = ctx.query;
    const result = await ctx.service.admin.role.query({ current, pageSize, name, code, status });

    if (result) {
      return ctx.helper.success(ctx, result);
    }
    ctx.helper.fail(ctx, {
      msg: '获取角色列表失败',
    });
  }
  /**
   * @router post /api/v1/admin/role
   * @summary 创建角色
   * @description 创建角色
   * @request body adminRoleCreateRequest *body
   * @response 200 baseResponse
   */
  async create () {
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
    const { isOK, msg } = await ctx.service.admin.role.create(data);
    if (!isOK) {
      return ctx.helper.fail(ctx, { msg });
    }
    ctx.helper.success(ctx, 'success');
  }
  /**
   * @router put /api/v1/admin/role
   * @summary 修改角色
   * @description 修改角色
   * @request body adminRoleUpdateRequest *body
   * @response 200 baseResponse
   */
  async update () {
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
    const { isOK, msg } = await ctx.service.admin.role.update(data);
    if (!isOK) {
      return ctx.helper.fail(ctx, { msg });
    }
    ctx.helper.success(ctx, 'success');
  }
  /**
   * @router delete /api/v1/admin/role/{id}
   * @summary 删除角色
   * @description 删除角色
   * @request path string *id 角色ID
   * @response 200 baseResponse
   */
  async remove () {
    const { ctx } = this;
    const { id } = ctx.params;
    await ctx.service.admin.role.remove(id);
    ctx.helper.success(ctx, 'success');
  }
  /**
   * @router get /api/v1/admin/role/{id}/users
   * @summary 查询角色用户
   * @description 查询角色用户
   * @request path string *id 用户ID
   * @response 200 adminRoleUserResponse
   */
  async getRoleUsers () {
    const { ctx } = this;
    const { id } = ctx.params;
    const result = await ctx.service.admin.role.getRoleUsers(id);
    ctx.helper.success(ctx, result);
  }
  /**
   * @router put /api/v1/admin/role/{id}/permissions
   * @summary 修改用户角色
   * @description 修改用户角色
   * @request body adminUpdateRoleUserRequest *body
   * @response 200 baseResponse
   */
  async updateRoleUsers () {
    const { ctx } = this;
    const { id } = ctx.params;
    const { userIds } = ctx.request.body;
    const result = await ctx.service.admin.role.updateRoleUsers(id, userIds);
    ctx.helper.success(ctx, result);
  }
  /**
   * @router get /api/v1/admin/role/{id}/permissions
   * @summary 查询角色权限
   * @description 查询角色权限
   * @request path string *id 用户ID
   * @response 200 adminRolePermissionsResponse
   */
  async getRolePermissions () {
    const { ctx } = this;
    const { id } = ctx.params;
    const result = await ctx.service.admin.role.getRolePermissions(id);
    ctx.helper.success(ctx, result);
  }
  /**
   * @router put /api/v1/admin/role/{id}/permissions
   * @summary 修改角色权限
   * @description 修改角色权限
   * @request path string *id 用户ID
   * @request body adminUpdateRolePermissionsRequest *body
   * @response 200 baseResponse
   */
  async updateRolePermissions () {
    const { ctx } = this;
    const { id } = ctx.params;
    const { permissionIds } = ctx.request.body;
    const result = await ctx.service.admin.role.updateRolePermissions(id, permissionIds);
    ctx.helper.success(ctx, result);
  }
}

module.exports = RoleController;
