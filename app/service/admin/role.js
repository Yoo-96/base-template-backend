/**
 *@BelongsProject: base-template-backend
 *@Author: yoo
 *@CreateTime:
 *@Description: 管理端 - 角色模块
 */
'use strict';
const Service = require('egg').Service;
const { toInt } = require('../../../utils/utils');


class RoleService extends Service {
  // 查询角色列表
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

    const result = await ctx.model.Admin.Role.findAndCountAll(query);
    return { data: result.rows, total: result.count };
  }
  // 创建角色
  async create({ code, name, description, status, createUser }) {
    const { ctx } = this;

    const isHas = await ctx.model.Admin.Role.findOne({
      where: { code },
    });
    if (isHas) {
      return { isOK: false, msg: '角色编码已存在' };
    }
    await ctx.model.Admin.Role.create({ code, name, description, status, createUser });
    return {
      isOK: true,
    };
  }
  // 编辑角色
  async update({ id, code, name, description, status, updateUser }) {
    const { ctx, app } = this;

    const role = await ctx.model.Admin.Role.findByPk(id);
    if (!role) {
      return { isOK: false, msg: '角色不存在' };
    }

    const op = app.Sequelize.Op;
    const isHas = await ctx.model.Admin.Role.findOne({
      where: {
        code,
        id: {
          [op.ne]: id,
        },
      },
    });
    if (isHas) {
      return { isOK: false, msg: '角色编码已存在' };
    }

    await ctx.model.Admin.Role.update({
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
  // 删除角色
  async remove(id) {
    const { ctx } = this;
    const result = await ctx.model.Admin.Role.destroy({
      where: { id },
    });
    return result;
  }
  // 获取角色关联用户
  async getRoleUsers(id) {
    const { ctx } = this;
    const result = await ctx.model.Admin.Role.findOne({
      where: {
        id,
      },
      include: [
        {
          model: ctx.model.Admin.User,
          through: { attributes: [] },
          attributes: [ 'id', 'account', 'mobile', 'userName' ],
        },
      ],
    });
    return result.admin_users;
  }
  // 修改用户角色
  async updateRoleUsers(id, userIds) {
    const { ctx } = this;
    const role = await ctx.model.Admin.Role.findByPk(id);
    const users = await ctx.model.Admin.User.findAll({
      where: { id: userIds },
    });
    // role.setUsers(users);
    role.setAdmin_users(users);
    return role;
  }
  // 查询角色权限
  async getRolePermissions(id) {
    const { ctx } = this;
    const result = await ctx.model.Admin.Role.findOne({
      where: {
        id,
      },
      include: [
        {
          model: ctx.model.Admin.Permission,
          through: { attributes: [] },
          attributes: [ 'code', 'name', 'id' ],
        },
      ],
    });
    return result.admin_permissions;
  }
  // 修改角色权限
  async updateRolePermissions(id, permissionIds) {
    const { ctx } = this;
    const role = await ctx.model.Admin.Role.findByPk(id);
    const permissions = await ctx.model.Admin.Permission.findAll({
      where: { id: permissionIds },
    });
    role.setAdmin_permissions(permissions);
    return role;
  }
}

module.exports = RoleService;
