/**
 *@BelongsProject: base-template-backend
 *@Author: yoo
 *@CreateTime: 2021-09-28 16:57
 *@Description: 管理端 - 权限管理 请求体和响应体
 */
'use strict';

module.exports = {
  // 权限列表响应体
  adminPermissionQueryResponse: {
    data: {
      type: 'string',
      example: [
        {
          id: 'ID',
          name: '权限名称',
          code: '权限编码',
          status: '状态, 0: 禁用, 1:启用',
          description: '权限描述',
        },
      ],
    },
    total: { type: 'number', example: '0' },
  },

  // 创建权限请求体
  adminPermissionCreateRequest: {
    code: { type: 'string', example: 'string', description: '权限编码' },
    name: { type: 'string', example: 'string', description: '权限名称' },
    description: { type: 'string', example: 'string', description: '权限描述' },
    status: { type: 'number', example: 1, description: '权限状态' },
  },

  // 修改权限请求体
  adminPermissionUpdateRequest: {
    code: { type: 'string', example: 'string', description: '权限编码' },
    name: { type: 'string', example: 'string', description: '权限名称' },
    description: { type: 'string', example: 'string', description: '权限描述' },
    status: { type: 'number', example: 1, description: '权限状态' },
  },
};
