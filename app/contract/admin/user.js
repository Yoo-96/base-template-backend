/**
 *@BelongsProject: base-template-backend
 *@Author: yoo
 *@CreateTime: 2021-09-27 11:24
 *@Description: 管理端 - 用户管理 请求体和响应体
 */

module.exports = {
  // 用户列表响应体
  adminUserQueryResponse: {
    data: {
      type: 'string',
      example: [
        {
          "id": "ID",
          "account": "账号",
          "mobile": "手机号",
          "userName": "用户名",
          "avatar": "头像",
          "email": "邮箱",
          "lastLogin": "最后登录时间",
          "lastIp": "最后登录ip",
          "isOpen": "是否启用, 0: 禁用, 1:启",
          "isAdmin": "是否超管, 0: 否, 1:是"
        }
      ],
    },
    total: { type: 'number', example: '0' },
  },

  // 创建用户请求体
  adminUserCreateRequest: {
    mobile: { type: 'string', example: 'string', description: '手机号' },
    password: { type: 'string', example: 'string', description: '手机号' },
  },
  // 创建用户响应体
  adminUserCreateResponse: {
    msg: { type: 'string', example: '手机号 xxxx 创建成功' },
  },

  // 用户登录请求体
  adminUserLoginRequest: {
    mobile: { type: 'string', example: 'string', description: '手机号' },
    password: { type: 'string', example: 'string', description: '手机号' },
  },
  // 用户登录响应体
  adminUserLoginResponse: {
    msg: { type: 'string', example: '登录成功' },
  },

  // 用户登出响应体
  adminUserLogoutResponse: {
    msg: { type: 'string', example: '登出成功' },
  },

  // 获取当前用户信息响应体
  adminUserCurrentUserResponse: {
    data: {
      type: 'string',
      example: {
        "account": "账号",
        "mobile": "手机号",
        "userName": "用户名",
        "avatar": "头像",
        "email": "邮箱",
        "lastLogin": "最后登录时间",
        "lastIp": "最后登录ip",
        "admin_roles": [
          {
            "code": "角色编码",
            "name": "角色名称",
            "id": "角色ID",
            "admin_permissions": [
              {
                "code": "权限编码",
                "name": "权限名称",
                "id": "权限ID"
              },
            ]
          },
        ]
      }
    }
  },
};
