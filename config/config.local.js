/**
 *@BelongsProject: base-template-backend
 *@Author: yoo
 *@CreateTime:
 *@Description: 系统本地配置文件
 */

'use strict';
const path = require('path');

module.exports = appInfo => {
  const config = {};

  // 文件储存路径
  config.upload_base_path = path.join(appInfo.baseDir, 'temp');
  // 本地图片预览接口
  config.image_preview_url = 'http://localhost:7001/api/v1/file/imagePreview';
  // 腾讯cos图片预览接口
  config.image_preview_cos_url = 'http://localhost:7001/api/v1/file/cImagePreview';
  // 本地附件下载接口
  config.attachment_download_url = 'http://localhost:7001/api/v1/file/downloadFile';

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
      typeCast (field, next) {
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
