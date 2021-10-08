/**
 *@BelongsProject: base-template-backend
 *@Author: yoo
 *@CreateTime:
 *@Description: 系统插件配置
 */
'use strict';

/** @type Egg.EggPlugin */
module.exports = {

  sequelize: {
    enable: true,
    package: 'egg-sequelize',
  },

  validatePlus: {
    enable: true,
    package: 'egg-validate-plus',
  },

  jwt: {
    enable: true,
    package: 'egg-jwt',
  },

  redis: {
    enable: true,
    package: 'egg-redis',
  },

  sessionRedis: {
    enable: true,
    package: 'egg-session-redis',
  },

  swaggerdoc: {
    enable: true,
    package: 'egg-swagger-doc',
  },
};
