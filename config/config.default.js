/* eslint valid-jsdoc: "off" */

'use strict';
const path = require('path');

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
  config.salt = 'base|md5|salt';

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
    },
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

  // 七牛云配置
  config.qiniu = {
    accessKey: 'QfA6PtKlgFDoAs0IyTLJURqYy_4oxr3ANrYbA8WI',
    secretKey: 'grjVqeQezIXJEI-EOyOXYU8-Ae9_VBETn2e_gmF1',
    bucket: 'base-template',
    domainName: 'http://qhgbs10e2.hn-bkt.clouddn.com/', // 七牛云测试域名，有效期30天
  };

  // 腾讯COS配置
  config.cos = {
    AppId: '1254446717',
    SecretId: 'AKIDs45qhyspNiHwRpA5OhlTzvnT2qQoRMVd',
    SecretKey: 'I8RVTEIJBKbihU8pJaqNnCwjJYfolXbk',
    Bucket: 'base-1254446717',
    Region: 'ap-guangzhou',
  };

  // 文件储存路径
  config.upload_base_path = path.join(appInfo.baseDir, 'temp');
  // 本读图片预览接口
  config.image_preview_url = 'http://localhost:7001/api/v1/file/imagePreview';
  // 腾讯cos图片预览接口
  config.image_preview_cos_url = 'http://localhost:7001/api/v1/file/cImagePreview';

  config.multipart = {
    mode: 'file',
    fileSize: '100mb',
    whitelist: filename => {
      const whitelist = [
        // images
        '.jpg',
        '.jpeg', // image/jpeg
        '.png', // image/png, image/x-png
        '.gif', // image/gif
        '.bmp', // image/bmp
        '.wbmp', // image/vnd.wap.wbmp
        '.webp',
        '.tif',
        '.psd',
        // text
        '.svg',
        '.js', '.jsx',
        '.json',
        '.css', '.less',
        '.html', '.htm',
        '.xml',
        '.pdf',
        '.doc', '.docx', '.xls', '.xlsx',
        '.ppt', '.pptx',
        // tar
        '.zip',
        '.gz', '.tgz', '.gzip', '.rar',
        // video
        '.mp3',
        '.mp4',
        '.avi',
      ];

      if (filename === 'blob') {
        return true;
      }

      return whitelist.includes(path.extname(filename).toLowerCase());
    },
  };

  return {
    ...config,
    ...userConfig,
  };
};
