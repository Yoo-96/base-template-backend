'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.get('/', controller.home.index);

  // 管理端
  // 用户模块
  router.get('/api/v1/user/list', controller.admin.user.list); // 用户列表
  router.post('/api/v1/user/register', controller.admin.user.register); // 创建用户
  router.post('/api/v1/user/login', controller.admin.user.login); // 用户登录
  router.get('/api/v1/user/logout', controller.admin.user.logout); // 用户登出
  router.get('/api/v1/user/getCurrentUser', controller.admin.user.getCurrentUser); // 获取当前用户信息

};
