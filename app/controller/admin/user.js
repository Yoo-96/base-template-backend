/**
 * @Controller 管理端-用户模块
 *@BelongsProject: base-template-backend
 *@Author: yoo
 *@CreateTime:
 *@Description: 管理端 - 用户模块
 */
'use strict';
const Controller = require('egg').Controller;
const encryption = require('../../../utils/encryption');


class UserController extends Controller {
  /**
   * @router get /api/v1/admin/user
   * @summary 用户列表
   * @description 用户列表
   * @request query integer *currentPage 当前页码
   * @request query integer *pageSize 分页条数
   * @response 200 adminUserQueryResponse
   */
  async query() {
    const { ctx } = this;
    const { currentPage = 1, pageSize = 20 } = ctx.query;
    const result = await ctx.service.admin.user.query({ pageSize, currentPage });

    if (result) {
      return ctx.helper.success(ctx, result);
    }
    ctx.helper.fail(ctx, {
      msg: '获取用户列表失败',
    });
  }

  /**
   * @router post /api/v1/admin/user
   * @summary 注册用户
   * @description 注册用户
   * @request body adminUserCreateRequest *body
   * @response 200 adminUserCreateResponse
   */
  async register() {
    const { ctx, app } = this;
    const { mobile, password } = ctx.request.body;

    const validateResult = await ctx.validate('admin.user.register', { mobile, password });
    if (!validateResult) return;

    const pwdHash = encryption.md5(app, password);
    const result = await ctx.service.admin.user.register(mobile, pwdHash);
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
   * @router post /api/v1/admin/user/login
   * @summary 用户登录
   * @description 用户登录
   * @request body adminUserLoginRequest *body
   * @response 200 adminUserLoginResponse
   */
  async login() {
    const { ctx } = this;
    const { mobile, password } = ctx.request.body;

    const validateResult = await ctx.validate('admin.user.login', { mobile, password });
    if (!validateResult) return;

    // const pwdHash = encryption.md5(app, password);
    const result = await ctx.service.admin.user.login(mobile, password);

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
   * @router get /api/v1/admin/user/logout
   * @summary 用户登出
   * @description 用户登出
   * @response 200 adminUserLogoutResponse
   */
  async logout() {
    const { ctx } = this;
    ctx.session = null;
    return ctx.helper.success(ctx, {
      msg: '登出成功',
    });
  }

  /**
   * @router get /api/v1/admin/user/getCurrentUser
   * @summary 获取当前用户信息
   * @description 获取当前用户信息
   * @response 200 adminUserCurrentUserResponse
   */
  async getCurrentUser() {
    const { ctx } = this;
    const currentUser = await ctx.service.admin.user.getCurrentUser();
    if (!currentUser) {
      return ctx.helper.fail(ctx, {
        msg: '用户信息查询失败',
      });
    }
    return ctx.helper.success(ctx, currentUser);
  }

  /**
   * @router put /api/v1/admin/user/{id}/status
   * @summary 启用、禁用用户
   * @description 启用、禁用用户
   * @request path string *id 用户ID
   * @response 200 baseResponse
   */
  async updateUserStatus() {
    const { ctx } = this;
    const { id } = ctx.params;
    const result = await ctx.service.admin.user.updateUserStatus(id);
    if (!result) {
      return ctx.helper.fail(ctx, {
        msg: '修改失败',
      });
    }
    ctx.helper.success(ctx, 'success');
  }
}

module.exports = UserController;
