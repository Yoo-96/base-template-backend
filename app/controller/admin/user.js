'use strict';
const Controller = require('egg').Controller;
const encryption = require('../../../utils/encryption');


class UserController extends Controller {
  // 用户列表
  async list () {
    const { ctx, app } = this;

    ctx.body = {
      msg: 'success'
    };
    ctx.status = 200;
  };

  // 创建用户
  async register () {
    const { ctx, app } = this;
    const { mobile, password } = ctx.request.body;

    const validateResult = await ctx.validate('user.register', { mobile, password });
    if (!validateResult) return;

    const pwdHash = encryption.md5(app, password);
    const result = await ctx.service.admin.user.register(mobile, pwdHash);
    if (result.isHas) {
      return ctx.helper.fail(ctx, {
        msg: `手机号 ${result.mobile} 已存在`
      });
    }
    return ctx.helper.success(ctx, {
      msg: `手机号 ${result.mobile} 创建成功`,
    });
  };

  // 用户登录
  async login () {
    const { ctx, app } = this;
    const { mobile, password } = ctx.request.body;

    const validateResult = await ctx.validate('user.login', { mobile, password });
    if (!validateResult) return;

    const pwdHash = encryption.md5(app, password);
    const result = await ctx.service.admin.user.login(mobile, pwdHash);

    if (!result) {
      return ctx.helper.fail(ctx, {
        msg: `账号或密码错误`
      });
    }
    ctx.session.currentUser = result;
    return ctx.helper.success(ctx, {
      msg: `登录成功`,
    });
  }

  // 用户登出
  async logout () {
    const { ctx } = this;
    ctx.session = null;
    return ctx.helper.success(ctx, {
      msg: `登出成功`,
    });
  }

  // 获取当前用户信息
  async getCurrentUser () {
    const { ctx } = this;
    const currentUser = await ctx.service.admin.user.getCurrentUser();
    if (!currentUser) {
      return ctx.helper.fail(ctx, {
        msg: `用户信息查询失败`
      });
    }
    return ctx.helper.success(ctx, currentUser);
  }
}

module.exports = UserController;
