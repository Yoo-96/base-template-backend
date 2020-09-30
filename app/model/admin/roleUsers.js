'use strict';
const db = require('../../../utils/db.js');

// RoleUsers模型
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
  });
  // AdminRoleUsers.sync({ alter: true });
  return AdminRoleUsers;
};
