/**
 *@BelongsProject: base-template-backend
 *@Author: yoo
 *@CreateTime: 2021-09-29 14:24
 *@Description: 管理端 - 客户端用户管理 请求体和响应体
 */
'use strict';

module.exports = {
  // 用户列表响应体
  adminUserQueryResponse: {
    data: {
      type: 'string',
      example: [
        {
          id: 'ID',
          account: '账号',
          mobile: '手机号',
          userName: '用户名',
          avatar: '头像',
          email: '邮箱',
          lastLogin: '最后登录时间',
          lastIp: '最后登录ip',
          isOpen: '是否启用, 0: 禁用, 1:启',
        },
      ],
    },
    total: { type: 'number', example: '0' },
  },
};
