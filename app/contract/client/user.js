/**
 *@BelongsProject: base-template-backend
 *@Author: yoo
 *@CreateTime: 2021-09-29 14:31
 *@Description: 客户端 - 用户管理 请求体和响应体
 */

module.exports = {
  // 创建用户请求体
  clientUserCreateRequest: {
    mobile: { type: 'string', example: 'string', description: '手机号' },
    password: { type: 'string', example: 'string', description: '手机号' },
  },
  // 创建用户响应体
  clientUserCreateResponse: {
    msg: { type: 'string', example: '手机号 xxxx 创建成功' },
  },

  // 用户登录请求体
  clientUserLoginRequest: {
    mobile: { type: 'string', example: 'string', description: '手机号' },
    password: { type: 'string', example: 'string', description: '手机号' },
  },
  // 用户登录响应体
  clientUserLoginResponse: {
    msg: { type: 'string', example: '登录成功' },
  },

  // 用户登出响应体
  clientUserLogoutResponse: {
    msg: { type: 'string', example: '登出成功' },
  },

  // 获取当前用户信息响应体
  clientUserCurrentUserResponse: {
    data: {
      type: 'string',
      example: {
        "account": "账号",
        "mobile": "手机号",
        "userName": "用户名",
        "avatar": "头像",
        "email": "邮箱",
      }
    }
  },

};
