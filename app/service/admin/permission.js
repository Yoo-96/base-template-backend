/**
 *@BelongsProject: base-template-backend
 *@Author: yoo
 *@CreateTime:
 *@Description: 管理端 - 权限模块
 */
'use strict';
const Service = require('egg').Service;
const { toInt } = require('../../../utils/utils');


class PermissionService extends Service {
  // 查询权限列表
  async query({ current = 1, pageSize = 20, name, code, status }) {
    const { ctx, app } = this;
    const op = app.Sequelize.Op;

    const _where = {};
    if (name) {
      _where.name = {
        [op.like]: `%${name}%`,
      };
    }
    if (code) {
      _where.code = {
        [op.like]: `%${code}%`,
      };
    }
    if (status) {
      _where.status = {
        [op.eq]: toInt(status),
      };
    }

    const query = {
      limit: toInt(pageSize),
      offset: (toInt(current) - 1) * toInt(pageSize),
      where: _where,
      order: [[ 'createdAt', 'DESC' ]],
      attributes: [ 'id', 'name', 'code', 'status', 'description' ],
      distinct: true,
    };

    const result = await ctx.model.Admin.Permission.findAndCountAll(query);
    return { data: result.rows, total: result.count };
  }
  // 创建权限
  async create({ code, name, description, status, createUser }) {
    const { ctx } = this;

    const isHas = await ctx.model.Admin.Permission.findOne({
      where: { code },
    });
    if (isHas) {
      return { isOK: false, msg: '权限编码已存在' };
    }
    await ctx.model.Admin.Permission.create({ code, name, description, status, createUser });
    return {
      isOK: true,
    };
  }
  // 编辑权限
  async update({ id, code, name, description, status, updateUser }) {
    const { ctx, app } = this;
    const role = await ctx.model.Admin.Permission.findByPk(id);
    if (!role) {
      return { isOK: false, msg: '权限不存在' };
    }

    const op = app.Sequelize.Op;
    const isHas = await ctx.model.Admin.Permission.findOne({
      where: {
        code,
        id: {
          [op.ne]: id,
        },
      },
    });
    if (isHas) {
      return { isOK: false, msg: '权限编码已存在' };
    }

    await ctx.model.Admin.Permission.update({
      code,
      name,
      description,
      status,
      updateUser,
    }, {
      where: { id },
    });
    return {
      isOK: true,
    };
  }
  // 删除权限
  async remove(id) {
    const { ctx } = this;
    const result = await ctx.model.Admin.Permission.destroy({
      where: { id },
    });
    return result;
  }
}

module.exports = PermissionService;
