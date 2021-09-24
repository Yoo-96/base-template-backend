/* eslint valid-jsdoc: "off" */

'use strict';

module.exports = () => {
  const config = {};

  config.sequelize = {
    dialect: 'mysql', // 数据库类型
    host: 'localhost', // host
    port: '3306', // 端口号
    username: 'root',
    password: 'root', // 密码
    database: 'base-template', // 数据库名
    timezone: '+08:00', // 保存为本地时区
    dialectOptions: {
      dateStrings: true,
      typeCast(field, next) {
        // for reading from database
        if (field.type === 'DATETIME') {
          return field.string();
        }
        return next();
      },
    },
  };

  return {
    ...config,
  };
};
