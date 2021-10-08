/**
 *@BelongsProject: base-template-backend
 *@Author: yoo
 *@CreateTime:
 *@Description: 管理端 - 用户模块
 */
'use strict';
const Service = require('egg').Service;
const { toInt } = require('../../../utils/utils');

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
    const isHas = await ctx.model.Admin.User.findOne(query);
    if (isHas) {
      return {
        isHas: true,
        mobile: params.mobile,
      };
    }

    const result = await ctx.model.Admin.User.create(params);
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
        password,
      },
    };
    const result = await ctx.model.Admin.User.findOne(query);
    if (result && result.isOpen === 1) {
      await ctx.model.Admin.User.update({
        lastLogin: new Date(),
      }, query);
      return result;
    }
    return result;
  }

  // 获取当前用户信息
  async getCurrentUser () {
    const { ctx } = this;
    const { id } = ctx.session.currentUser;
    return this.findUserById(id);
  }
  // 根据id查询用户详情，包含用户角色权限
  async findUserById (id) {
    const { ctx } = this;
    return await ctx.model.Admin.User.findOne({
      where: { id },
      include: [{
        model: ctx.model.Admin.Role,
        through: { attributes: [] },
        attributes: [ 'code', 'name', 'id' ],
        include: [{
          model: ctx.model.Admin.Permission,
          through: { attributes: [] },
          attributes: [ 'code', 'name', 'id' ],
        }],
      }],
      attributes: [ 'account', 'mobile', 'userName', 'avatar', 'email', 'lastLogin', 'lastIp', 'isOpen' ],
    });
  }

  // 查询用户列表
  async query ({ page = 1, size = 10 }) {
    const { ctx } = this;

    const query = {
      limit: toInt(size),
      offset: (toInt(page) - 1) * toInt(size),
      order: [[ 'createdAt', 'DESC' ]],
      attributes: [ 'id', 'account', 'mobile', 'userName', 'avatar', 'email', 'lastLogin', 'lastIp', 'isOpen', 'isAdmin' ],
      distinct: true,
    };

    const result = await ctx.model.Admin.User.findAndCountAll(query);
    return { data: result.rows, total: result.count };
  }
  // 启用、禁用用户
  async updateUserStatus (id) {
    const { ctx } = this;
    const user = await ctx.model.Admin.User.findOne({ where: { id } });
    await ctx.model.Admin.User.update({
      isOpen: user.isOpen === 1 ? 0 : 1,
    }, {
      where: { id },
    });
    return user;
  }
}

module.exports = UserService;
