/**
 *@BelongsProject: base-template-backend
 *@Author: yoo
 *@CreateTime:
 *@Description: 管理端 - 角色用户中间表 RoleUsers模型
 */
'use strict';
const db = require('../../../utils/db.js');

module.exports = app => {
  const { STRING } = app.Sequelize;

  const AdminRoleUsers = db.defineModel(app, 'admin_role_users', {
    adminUserId: {
      type: STRING,
      comment: '用户id',
    },
    adminRoleId: {
      type: STRING,
      comment: '角色id',
    },
  }, {
    comment: '管理端-角色用户中间表',
  });
  // AdminRoleUsers.sync({ alter: true });
  return AdminRoleUsers;
};
