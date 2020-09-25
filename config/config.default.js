/* eslint valid-jsdoc: "off" */

'use strict';

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1592356514018_8643';

  // add your middleware config here
  config.middleware = [ 'errorHandler', 'auth' ];

  // md5盐
  config.salt = "base|md5|salt";

  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
  };

  // 安全配置
  config.security = {
    csrf: {
      enable: false,
      ignoreJSON: true,
      // useSession: true, // 默认为 false，当设置为 true 时，将会把 csrf token 保存到 Session 中
      // cookieName: 'csrfToken', // Cookie 中的字段名，默认为 csrfToken
      // sessionName: 'csrfToken', // Session 中的字段名，默认为 csrfToken
      // headerName: 'x-csrf-token', // 通过 header 传递 CSRF token 的默认字段为 x-csrf-token
      // queryName: '_csrf', // 通过 query 传递 CSRF token 的默认字段为 _csrf
      // bodyName: '_csrf', // 通过 body 传递 CSRF token 的默认字段为 _csrf
    },
    // domainWhiteList: [ 'localhost'], // 白名单
  };

  // egg-validate-plus 异常拦截
  config.validatePlus = {
    resolveError(ctx, errors) {
      if (errors.length) {
        ctx.type = 'json';
        ctx.status = 400;
        ctx.body = {
          code: 400,
          error: errors,
          msg: '参数错误',
        };
      }
    }
  };

  // redis配置
  config.redis = {
    client: {
      host: 'localhost',
      port: '6379',
      password: '',
      db: '0',
    },
    agent: true,
  };

  // session配置
  config.session = {
    key: 'SESSION_ID',
    maxAge: 30 * 1000 * 60, // 过期时间30min
    httpOnly: true,
    encrypt: false,
    renew: false, // 每次访问页面都会给session会话延长时间
    // externalKey: 'access_token',
  };

  return {
    ...config,
    ...userConfig,
  };
};
