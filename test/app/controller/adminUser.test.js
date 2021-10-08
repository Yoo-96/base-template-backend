'use strict';

const { app } = require('egg-mock/bootstrap');

describe('test/app/controller/adminUser.test.js', () => {
  it('should user register', async () => {

    const data = {
      mobile: '15015015012',
      password: '123456aa',
    };
    app.mockCsrf();
    return app.httpRequest()
      .post('/api/v1/admin/user/register')
      .send(data)
      .expect(200)
      .expect({
        msg: '手机号 15015015012 创建成功',
      });
  });
});
