'use strict';
module.exports = () => {
  return async function auth(ctx, next) {
    const currentUser = ctx.session.currentUser;
    const whiteList = [
      '/api/v1/admin/user/login', // 登录接口
      '/api/v1/admin/user/register', // 注册接口
      '/api/v1/file/imagePreview', // 本地图片预览
      '/api/v1/file/cImagePreview', // 腾讯cos图片预览
    ];
    const isSkipPath = whiteList.includes(ctx.request.path);

    if (currentUser || isSkipPath) {
      await next();
    } else {
      ctx.status = 401;
      ctx.body = {
        msg: '登录已过期',
      };
    }
  };
};
