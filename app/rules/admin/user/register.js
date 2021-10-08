/**
 *@BelongsProject: base-template-backend
 *@Author: yoo
 *@CreateTime:
 *@Description: 管理端 - 用户注册参数校验
 */
'use strict';

const rule = {
  mobile: [
    { required: true, message: '手机号不能为空' },
    {
      validator (rule, value, callback) {
        const pattern = /^\d{11}$/;
        if (pattern.test(value)) {
          callback();
          return;
        }
        callback({ message: '手机号格式不正确' });
      },
    },
  ],
  password: [
    { required: true, message: '密码不能为空' },
    {
      validator (rule, value, callback) {
        const pattern = /^(?=.*[a-zA-Z])(?=.*\d)[^]{8,16}$/;
        if (pattern.test(value)) {
          callback();
          return;
        }
        callback({ message: '密码最少包含一个字母、数字并且为8-16位' });
      },
    },
  ],
};

module.exports = rule;
