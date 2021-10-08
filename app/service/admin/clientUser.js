/**
 *@BelongsProject: base-template-backend
 *@Author: yoo
 *@CreateTime: 2021-09-26 16:50
 *@Description: 管理端 - 客户端用户管理
 */
'use strict';
const Service = require('egg').Service;
const { toInt } = require('../../../utils/utils');

class ClientUserService extends Service {
  // 查询用户列表
  async query ({ page = 1, size = 10 }) {
    const { ctx } = this;

    const query = {
      limit: toInt(size),
      offset: (toInt(page) - 1) * toInt(size),
      order: [[ 'createdAt', 'DESC' ]],
      attributes: [ 'id', 'account', 'mobile', 'userName', 'avatar', 'email', 'lastLogin', 'lastIp', 'isOpen' ],
      distinct: true,
    };

    const result = await ctx.model.Client.User.findAndCountAll(query);
    return { data: result.rows, total: result.count };
  }
  // 启用、禁用用户
  async updateUserStatus (id) {
    const { ctx } = this;
    const user = await ctx.model.Client.User.findOne({ where: { id } });
    await ctx.model.Client.User.update({
      isOpen: user.isOpen === 1 ? 0 : 1,
    }, {
      where: { id },
    });
    return user;
  }
}

module.exports = ClientUserService;
