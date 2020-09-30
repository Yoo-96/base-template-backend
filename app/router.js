'use strict';
const { protect } = require('./util/permission');

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.get('/', controller.home.index);

  // 管理端
  // 用户模块
  router.post('/api/v1/admin/user/register', controller.admin.user.register); // 创建用户
  router.post('/api/v1/admin/user/login', controller.admin.user.login); // 用户登录
  router.get('/api/v1/admin/user/logout', controller.admin.user.logout); // 用户登出
  router.get('/api/v1/admin/user/getCurrentUser', controller.admin.user.getCurrentUser); // 获取当前用户信息

  // 角色权限模块
  router.get('/api/v1/admin/role', protect('LIST_ROLE'), controller.admin.role.query); // 角色列表
  router.post('/api/v1/admin/role', protect('CREATE_ROLE'), controller.admin.role.create); // 创建角色
  router.put('/api/v1/admin/role', protect('EDITOR_ROLE'), controller.admin.role.update); // 编辑角色
  router.delete('/api/v1/admin/role/:id', protect('DELETE_ROLE'), controller.admin.role.remove); // 删除角色
  router.get('/api/v1/admin/role/:id/users', protect('QUERY_ROLE_USER'), controller.admin.role.getRoleUsers); // 查用角色用户
  router.put('/api/v1/admin/role/:id/users', protect('UPDATE_ROLE_USER'), controller.admin.role.updateRoleUsers); // 修改用户角色
  router.get('/api/v1/admin/role/:id/permissions', protect('QUERY_ROLE_PERMISSION'), controller.admin.role.getRolePermissions); // 查用角色权限
  router.put('/api/v1/admin/role/:id/permissions', protect('UPDATE_ROLE_PERMISSION'), controller.admin.role.updateRolePermissions); // 修改角色权限
  router.get('/api/v1/admin/permission', protect('LIST_PERMISSION'), controller.admin.permission.query); // 权限列表
  router.post('/api/v1/admin/permission', protect('CREATE_PERMISSION'), controller.admin.permission.create); // 创建权限
  router.put('/api/v1/admin/permission', protect('EDITOR_PERMISSION'), controller.admin.permission.update); // 编辑权限
  router.delete('/api/v1/admin/permission/:id', protect('DELETE_PERMISSION'), controller.admin.permission.remove); // 删除权限
  router.get('/api/v1/admin/user', protect('LIST_USER'), controller.admin.user.query); // 用户列表
  router.put('/api/v1/admin/user/:id/status', protect('UPDATE_ROLE_PERMISSION'), controller.admin.user.updateUserStatus); // 启用、禁用用户
};
