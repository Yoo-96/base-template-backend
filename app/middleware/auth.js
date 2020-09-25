module.exports = () => {
  return async function auth(ctx, next) {
    const currentUser = ctx.session.currentUser;
    const whiteList = [ '/api/v1/user/login', '/api/v1/user/register' ];
    const isSkipPath = whiteList.includes(ctx.request.path);

    if (currentUser || isSkipPath) {
      await next();
    } else {
      ctx.status = 401;
      ctx.body = {
        msg: '登录已过期'
      };
    }
  }
};
