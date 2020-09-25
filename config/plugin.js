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
};
