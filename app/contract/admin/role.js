/**
 *@BelongsProject: base-template-backend
 *@Author: yoo
 *@CreateTime: 2021-09-27 11:24
 *@Description: 管理端 - 用户管理 请求体和响应体
 */

module.exports = {
  // 角色列表响应体
  adminRoleQueryResponse: {
    data: {
      type: 'string',
      example: [
        {
          "id": "ID",
          "name": "角色名称",
          "code": "角色编码",
          "status": "状态, 0: 禁用, 1:启用",
          "description": "角色描述"
        }
      ],
    },
    total: { type: 'number', example: '0' },
  },

  // 创建角色请求体
  adminRoleCreateRequest: {
    code: { type: 'string', example: 'string', description: '角色编码' },
    name: { type: 'string', example: 'string', description: '角色名称' },
    description: { type: 'string', example: 'string', description: '角色描述' },
    status: { type: 'number', example: 1, description: '角色状态' },
  },

  // 修改角色请求体
  adminRoleUpdateRequest: {
    id: { type: 'string', example: 'string', description: 'ID' },
    code: { type: 'string', example: 'string', description: '角色编码' },
    name: { type: 'string', example: 'string', description: '角色名称' },
    description: { type: 'string', example: 'string', description: '角色描述' },
    status: { type: 'number', example: 1, description: '角色状态' },
  },

  // 查询角色用户响应体
  adminRoleUserResponse: {
    data: {
      type: 'string',
      example: [
        {
          "id": "ID",
          "account": "用户账号",
          "mobile": "用户手机号",
          "userName": "用户名称"
        }
      ],
    },
  },

  // 修改角色用户请求体
  adminUpdateRoleUserRequest: {
    userIds: { type: 'string', example: [], description: '用户ID集合' }
  },

  // 角色权限响应体
  adminRolePermissionsResponse: {
    data: {
      type: 'string',
      example: [
        {
          "code": "权限编码",
          "name": "权限名称",
          "id": "ID"
        }
      ]
    }
  },

  // 修改角色权限请求体
  adminUpdateRolePermissionsRequest: {
    permissionIds: { type: 'string', example: [], description: '权限ID集合' }
  }
};
