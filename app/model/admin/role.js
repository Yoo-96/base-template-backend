/**
 *@BelongsProject: base-template-backend
 *@Author: yoo
 *@CreateTime:
 *@Description: 管理端 - 角色表 Role模型
 */
'use strict';
const db = require('../../../utils/db.js');

module.exports = app => {
  const { STRING, TINYINT } = app.Sequelize;

  const Role = db.defineModel(app, 'admin_role', {
    code: {
      type: STRING,
      comment: '角色编码',
    },
    name: {
      type: STRING,
      comment: '角色名',
    },
    description: {
      type: STRING,
      comment: '权限描述',
    },
    status: {
      type: TINYINT,
      defaultValue: 0,
      comment: '状态, 0: 禁用, 1:启用',
    },
    updateUser: {
      type: STRING,
      comment: '最后更新人',
    },
    createUser: {
      type: STRING,
      comment: '创建人',
    },
  }, {
    comment: '管理端-角色表',
  });

  Role.associate = () => {
    Role.belongsToMany(app.model.Admin.Permission, {
      through: app.model.Admin.RolePermissions,
    });
    Role.belongsToMany(app.model.Admin.User, {
      through: app.model.Admin.RoleUsers,
    });
  };

  Role.sync({ alter: true });
  return Role;
};
