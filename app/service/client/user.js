/**
 *@BelongsProject: base-template-backend
 *@Author: yoo
 *@CreateTime:
 *@Description: 客户端 - 用户模块
 */
'use strict';
const Service = require('egg').Service;

class UserService extends Service {
  // 创建用户
  async register(mobile, password) {
    const { ctx } = this;
    const params = { mobile, password, account: mobile };

    // 检查登录账号是否存在
    const query = {
      where: {
        mobile: params.mobile,
      },
    };
    const isHas = await ctx.model.Client.User.findOne(query);
    if (isHas) {
      return {
        isHas: true,
        mobile: params.mobile,
      };
    }

    const result = await ctx.model.Client.User.create(params);
    return {
      isHas: false,
      mobile: result.mobile,
    };
  }
  // 用户登录
  async login(mobile, password) {
    const { ctx } = this;
    const query = {
      where: {
        mobile,
        password,
      },
    };
    const result = await ctx.model.Client.User.findOne(query);
    if (result && result.isOpen === 1) {
      await ctx.model.Client.User.update({
        lastLogin: new Date(),
      }, query);
      return result;
    }
    return result;
  }

  // 获取当前用户信息
  async getCurrentUser() {
    const { ctx } = this;
    const { id } = ctx.session.currentUser;
    return this.findUserById(id);
  }
  // 根据id查询用户详情
  async findUserById(id) {
    const { ctx } = this;
    return await ctx.model.Client.User.findOne({
      where: { id },
      attributes: [ 'account', 'mobile', 'userName', 'avatar', 'email' ],
    });
  }
}

module.exports = UserService;
