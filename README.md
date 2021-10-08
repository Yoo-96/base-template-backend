# Base Template Backend

基于egg开发的基础服务端项目

## 快速开始

<!-- add docs here for user -->

see [egg docs][egg] for more detail.

## 环境准备

### mysql

```bash
$ mysql.server start
```

### redis

```bash
$ redis-server
```

## 开发

```bash
$ npm i
$ npm run dev
$ open http://localhost:7001/
```

## 部署

```bash
$ npm start
$ npm stop
```

## npm scripts

- Use `npm run lint` to check code style.
- Use `npm test` to run unit test.
- Use `npm run autod` to auto detect dependencies upgrade, see [autod](https://www.npmjs.com/package/autod) for more detail.

## 基于本项目搭建新项目

### git clone

```bash
$ git clone https://gitee.com/developer-yoo-group/base-template-backend.git yoo-project-name
```

### 修改package.json

修改项目名称和版本号：
```json
{
  "name": "yoo-project-name",
  "version": "1.0.0"
}
```

### 修改mysql配置（本地）

```js
// config/config.local.js
module.exports = appInfo => {
  const config = {};

  config.sequelize = {
    dialect: 'mysql', // 数据库类型
    host: 'localhost', // host
    port: '3306', // 端口号
    username: 'root',
    password: 'root', // 密码
    database: 'base-template', // 数据库名
    timezone: '+08:00', // 保存为本地时区
    dialectOptions: {
      dateStrings: true,
      typeCast (field, next) {
        // for reading from database
        if (field.type === 'DATETIME') {
          return field.string();
        }
        return next();
      },
    },
  };

  return {
    ...config,
  };
};
```

### 更多修改请根据项目需求



[egg]: https://eggjs.org
