/**
 *@BelongsProject: base-template-backend
 *@Author: yoo
 *@CreateTime:
 *@Description: 管理端 - 权限表 Permission模型
 */
'use strict';
const db = require('../../../utils/db.js');

module.exports = app => {
  const { STRING, TINYINT } = app.Sequelize;

  const AdminPermission = db.defineModel(app, 'admin_permissions', {
    code: {
      type: STRING,
      comment: '权限编码',
    },
    name: {
      type: STRING,
      comment: '权限名称',
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
  });
  // AdminPermission.sync({ alter: true });
  return AdminPermission;
};
