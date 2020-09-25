'use strict';
const Service = require('egg').Service;

class UserService extends Service {
  // 创建用户
  async register (mobile, password) {
    const { ctx } = this;
    const params = { mobile, password, account: mobile };

    // 检查登录账号是否存在
    const query = {
      where: {
        mobile: params.mobile,
      },
    };
    const isHas = await ctx.model.User.findOne(query);
    if (isHas) {
      return {
        isHas: true,
        mobile: params.mobile,
      }
    }

    const result = await ctx.model.User.create(params);
    return {
      isHas: false,
      mobile: result.mobile,
    };
  }
  // 用户登录
  async login (mobile, password) {
    const { ctx } = this;
    const query = {
      where: {
        mobile,
        password
      }
    };
    const check = await ctx.model.User.findOne(query);
    await ctx.model.User.update({
      lastLogin: new Date()
    }, query);
    return check;
  }

  // 获取当前用户信息
  async getCurrentUser () {
    const { ctx } = this;
    const { id } = ctx.session.currentUser;
    return await ctx.model.User.findOne({
      where: { id },
      attributes: [ 'account', 'mobile', 'userName', 'avatar', 'email', 'lastLogin', 'lastIp' ]
    });
  }
}

module.exports = UserService;
