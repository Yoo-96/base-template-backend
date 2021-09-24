'use strict';
const Controller = require('egg').Controller;

class RoleController extends Controller {
  async query() {
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
    const { isOK, msg } = await ctx.service.admin.role.create(data);
    if (!isOK) {
      return ctx.helper.fail(ctx, { msg });
    }
    ctx.helper.success(ctx, 'success');
  }
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
    const { isOK, msg } = await ctx.service.admin.role.update(data);
    if (!isOK) {
      return ctx.helper.fail(ctx, { msg });
    }
    ctx.helper.success(ctx, 'success');
  }
  async remove() {
    const { ctx } = this;
    const { id } = ctx.params;
    const result = await ctx.service.admin.role.remove(id);
    ctx.helper.success(ctx, 'success', result);
  }
  // 查询角色用户
  async getRoleUsers() {
    const { ctx } = this;
    const { id } = ctx.params;
    const result = await ctx.service.admin.role.getRoleUsers(id);
    ctx.helper.success(ctx, result);
  }
  // 修改用户角色
  async updateRoleUsers() {
    const { ctx } = this;
    const { id } = ctx.params;
    const { userIds } = ctx.request.body;
    const result = await ctx.service.admin.role.updateRoleUsers(id, userIds);
    ctx.helper.success(ctx, result);
  }
  // 查询角色用户
  async getRolePermissions() {
    const { ctx } = this;
    const { id } = ctx.params;
    const result = await ctx.service.admin.role.getRolePermissions(id);
    ctx.helper.success(ctx, result);
  }
  // 修改用户角色
  async updateRolePermissions() {
    const { ctx } = this;
    const { id } = ctx.params;
    const { permissionIds } = ctx.request.body;
    const result = await ctx.service.admin.role.updateRolePermissions(id, permissionIds);
    ctx.helper.success(ctx, result);
  }

}

module.exports = RoleController;
