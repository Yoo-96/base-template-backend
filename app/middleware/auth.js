/**
 *@BelongsProject: base-template-backend
 *@Author: yoo
 *@CreateTime:
 *@Description: 系统权限中间件
 */
'use strict';
module.exports = () => {
  return async function auth (ctx, next) {
    const currentUser = ctx.session.currentUser;
    // 登录白名单列表
    const whiteList = [
      '/api/v1/admin/user/login', // 管理端 - 登录接口
      '/api/v1/admin/user/register', // 管理端 - 注册接口
      '/api/v1/file/imagePreview', // 本地图片预览
      '/api/v1/file/cImagePreview', // 腾讯cos图片预览
      '/api/v1/client/user/login', // 客户端 - 登录接口
      '/api/v1/client/user/register', // 管理端 - 注册接口
    ];
    const isSwagger = ctx.request.path.indexOf('swagger') > -1;
    const isSkipPath = whiteList.includes(ctx.request.path);

    if (currentUser || isSkipPath || isSwagger) {
      await next();
    } else {
      ctx.status = 401;
      ctx.body = {
        msg: '登录已过期',
      };
    }
  };
};
