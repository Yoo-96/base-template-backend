'use strict';
const db = require('../../utils/db.js');

// User模型
module.exports = app => {
  const { STRING, DATE, TINYINT } = app.Sequelize;

  const User = db.defineModel(app, 'users', {
    // id: { type: CHAR, unique: true, primaryKey: true }, // 用户id
    account: {
      type: STRING,
      comment: '用户账号',
    },
    mobile: {
      type: STRING,
      comment: '用户手机号/登录账号',
    },
    userName: {
      type: STRING,
      comment: '用户名称',
    },
    password: {
      type: STRING,
      comment: '用户密码',
    },
    avatar: {
      type: STRING,
      comment: '用户头像',
    },
    email: {
      type: STRING,
      comment: '用户邮箱',
    },
    isAdmin: {
      type: TINYINT,
      defaultValue: 0,
      comment: '是否超管, 0: 否, 1:是',
    },
    isOpen: {
      type: TINYINT,
      defaultValue: 0,
      comment: '是否启用, 0: 禁用, 1:启用',
    },
    isDelete: {
      type: TINYINT,
      defaultValue: 0,
      comment: '是否已删除, 0: 否, 1:是',
    },
    lastLogin: {
      type: DATE,
      comment: '最后登录时间',
    },
    lastIp: {
      type: STRING,
      comment: '最后登录ip',
    },
  });
  User.sync({
    alter: true, // 启用更新
  });
  return User;
};
