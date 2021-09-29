/**
 * @Controller 客户端-用户模块
 *@BelongsProject: base-template-backend
 *@Author: yoo
 *@CreateTime:
 *@Description: 客户端 - 用户模块
 */
'use strict';
const Controller = require('egg').Controller;
const encryption = require('../../../utils/encryption');


class UserController extends Controller {
  /**
   * @router post /api/v1/client/user
   * @summary 注册用户
   * @description 注册用户
   * @request body clientUserCreateRequest *body
   * @response 200 clientUserCreateResponse
   */
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

  /**
   * @router post /api/v1/client/user/login
   * @summary 用户登录
   * @description 用户登录
   * @request body clientUserLoginRequest *body
   * @response 200 clientUserLoginResponse
   */
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

  /**
   * @router get /api/v1/client/user/logout
   * @summary 用户登出
   * @description 用户登出
   * @response 200 clientUserLogoutResponse
   */
  async logout() {
    const { ctx } = this;
    ctx.session = null;
    return ctx.helper.success(ctx, {
      msg: '登出成功',
    });
  }

  /**
   * @router get /api/v1/client/user/getCurrentUser
   * @summary 获取当前用户信息
   * @description 获取当前用户信息
   * @response 200 clientUserCurrentUserResponse
   */
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
