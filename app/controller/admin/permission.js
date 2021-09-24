'use strict';
const Controller = require('egg').Controller;

class PermissionController extends Controller {
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
  async remove() {
    const { ctx } = this;
    const { id } = ctx.params;
    const result = await ctx.service.admin.permission.remove(id);
    ctx.helper.success(ctx, 'success', result);
  }
}

module.exports = PermissionController;
