/**
 *@BelongsProject: base-template-backend
 *@Author: yoo
 *@CreateTime:
 *@Description: 客户端 - 用户登录参数校验
 */
'use strict';

const rule = {
  mobile: [
    { required: true, message: '手机号不能为空' },
  ],
  password: [
    { required: true, message: '密码不能为空' },
  ],
};

module.exports = rule;
