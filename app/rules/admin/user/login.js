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
