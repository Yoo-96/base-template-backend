/**
 *@BelongsProject: base-template-backend
 *@Author: yoo
 *@CreateTime:
 *@Description: 客户端 - 用户模块
 */
'use strict';
const Controller = require('egg').Controller;
const encryption = require('../../../utils/encryption');


class UserController extends Controller {
  // 注册用户
  async register() {
    const { ctx, app } = this;
    const { mobile, password } = ctx.request.body;

    const validateResult = await ctx.validate('client.user.register', { mobile, password });
    if (!validateResult) return;

    const pwdHash = encryption.md5(app, password);
    const result = await ctx.service.client.user.register(mobile, pwdHash);
    if (result.isHas) {
      return ctx.helper.fail(ctx, {
        msg: `手机号 ${result.mobile} 已存在`,
      });
    }
    return ctx.helper.success(ctx, {
      msg: `手机号 ${result.mobile} 创建成功`,
    });
  }

  // 用户登录
  async login() {
    const { ctx } = this;
    const { mobile, password } = ctx.request.body;

    const validateResult = await ctx.validate('client.user.login', { mobile, password });
    if (!validateResult) return;

    // const pwdHash = encryption.md5(app, password);
    const result = await ctx.service.client.user.login(mobile, password);

    if (!result) {
      return ctx.helper.fail(ctx, {
        msg: '账号或密码错误',
      });
    } else if (result.isOpen !== 1) {
      return ctx.helper.fail(ctx, {
        msg: '该账号已经禁用，请联系管理员',
      });
    }
    ctx.session.currentUser = result;
    return ctx.helper.success(ctx, {
      msg: '登录成功',
    });
  }

  // 用户登出
  async logout() {
    const { ctx } = this;
    ctx.session = null;
    return ctx.helper.success(ctx, {
      msg: '登出成功',
    });
  }

  // 获取当前用户信息
  async getCurrentUser() {
    const { ctx } = this;
    const currentUser = await ctx.service.client.user.getCurrentUser();
    if (!currentUser) {
      return ctx.helper.fail(ctx, {
        msg: '用户信息查询失败',
      });
    }
    return ctx.helper.success(ctx, currentUser);
  }
}

module.exports = UserController;
