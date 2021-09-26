/**
 *@BelongsProject: base-template-backend
 *@Author: yoo
 *@CreateTime:
 *@Description: 管理端 - 角色权限中间表 RolePermissions模型
 */
'use strict';
const db = require('../../../utils/db.js');

module.exports = app => {
  const { STRING } = app.Sequelize;

  const AdminRolePermissions = db.defineModel(app, 'admin_role_permissions', {
    adminPermissionId: {
      type: STRING,
      comment: '权限id',
    },
    adminRoleId: {
      type: STRING,
      comment: '角色id',
    },
  });

  // AdminRolePermissions.sync({ alter: true });
  return AdminRolePermissions;
};

