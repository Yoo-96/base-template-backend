# Base Template Backend

一个使用 `Node.js` 开发的，基于 `Egg.js`、`Sequelize`、`redis`、`RBAC`、`RESTful API`、`swagger-doc`、`单元测试` 等实现的基础服务端项目。

实现了用户注册登陆、用户管理、角色权限控制、附件上传（本地、七牛云、腾讯cos）等功能。

## 仓库地址

[github](https://github.com/Yoo-96/base-template-backend)，欢迎使用和点亮小星星。

[gitee](https://gitee.com/developer-yoo-group/base-template-backend)，欢迎使用和点亮小星星。

## 实现的功能

### 管理端

- 用户注册、登陆、登出
- 用户管理（客户端、管理端）
- 角色权限管理（RBAC）

### 客户端

- 用户注册、登陆、登出

### 附件模块

- 附件上传、下载
- 图片上传、预览

## 所用技术栈

- 基础框架: [Egg.js](https://eggjs.org/zh-cn/)
- ORM 框架: [Sequelize](https://sequelize.org/)
- 存储系统: redis
- 接口文档: [egg-swagger-doc](https://github.com/Yanshijie-EL/egg-swagger-doc)
- 权限控制: 基于 RBAC
- 对象储存: qiniu、腾讯cos
- 请求字段验证: [egg-validate-plus](https://github.com/temool/egg-validate-plus)

## 目录结构

```
├── app
│   ├── contract // swagger-doc 接口文档
│   │   ├── admin
│   │   │   ├── clientUser.js
│   │   │   ├── permission.js
│   │   │   ├── role.js
│   │   │   └── user.js
│   │   ├── base.js
│   │   ├── client
│   │   │   └── user.js
│   │   └── file
│   │       └── file.js
│   ├── controller
│   │   ├── admin // 管理端 controller
│   │   │   ├── clientUser.js // 客户端用户管理
│   │   │   ├── permission.js // 权限模块
│   │   │   ├── role.js // 角色模块
│   │   │   └── user.js // 用户模块
│   │   ├── client // 客户端 controller
│   │   │   └── user.js // 用户模块
│   │   ├── file // 附件模块 controller
│   │   │   └── index.js // 附件模块
│   │   └── home.js
│   ├── extend // 扩展目录
│   │   └── helper.js // 接口异常处理
│   ├── middleware // 中间件
│   │   ├── auth.js // 系统权限中间件
│   │   └── error_handler.js // 错误处理中间件
│   ├── model
│   │   ├── admin // 管理端
│   │   │   ├── permission.js // 权限表 Permission模型
│   │   │   ├── role.js // 角色表 Role模型
│   │   │   ├── rolePermissions.js // 角色权限中间表 RolePermissions模型
│   │   │   ├── roleUsers.js // 角色用户中间表 RoleUsers模型
│   │   │   └── user.js // 用户表 User模型
│   │   ├── client // 客户端
│   │   │   └── user.js // 用户表 User模型
│   │   └── file // 附件
│   │       ├── attachmentLog.js // 附件表 AttachmentLog模型
│   │       └── attachments.js // 附件表 Attachment模型
│   ├── public
│   ├── router.js // 路由
│   ├── rules // egg-validate-plus 检验规则
│   │   ├── admin // 管理端
│   │   │   └── user // 用户
│   │   │       ├── login.js // 登陆
│   │   │       └── register.js // 注册
│   │   └── client // 客户端
│   │       └── user // 用户
│   │           ├── login.js // 登陆
│   │           └── register.js // 注册
│   └── service
│       ├── admin // 管理端
│       │   ├── clientUser.js // 客户端用户管理
│       │   ├── permission.js // 权限模块
│       │   ├── role.js // 角色模块
│       │   └── user.js // 用户模块
│       ├── client // 客户端
│       │   └── user.js // 用户模块
│       └── file // 附件
│           ├── attachmentLog.js // 附件日志
│           ├── attachments.js // 附件模块
│           └── index.js // 文件模块
├── config // 配置
│   ├── config.default.js // 系统默认配置文件
│   ├── config.local.js // 系统本地配置文件
│   ├── config.unittest.js // 系统单元测试配置文件
│   └── plugin.js // 系统插件配置
├── enums // 枚举
│   └── AttachmentLogEnums.js // 附件操作日志枚举
├── logs // 日志
├── temp // 附件上传本地临时目录
│   ├── cos // 腾讯cos上传临时目录
│   ├── local // 本地上传临时目录
│   │   ├── attachments // 附件
│   │   │   └── 2021
│   │   │       ├── 08
│   │   │       │   └── 30
│   │   │       ├── 09
│   │   │       │   └── 30
│   │   │       └── 10
│   │   │           └── 08
│   │   └── images // 图片
│   │       └── thumbnail // 缩略图
│   └── qiniu // 七牛云上传临时目录
├── test // 单元测试
│   └── app
│       └── controller
│           ├── adminUser.test.js // 管理端用户单元测试
│           └── home.test.js
└── utils // 工具类
    ├── cos.js // 腾讯COS
    ├── date.js // 日期工具类
    ├── db.js // 数据模型默认配置
    ├── encryption.js // crypto加密公共函数
    ├── file.js // 文件公共方法
    ├── permission.js // 接口权限校验方法
    ├── qiniu.js // 七牛
    └── utils.js // 公共方法
```

## 快速开始

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
$ # open swagger-docs: http://localhost:7001/swagger-ui.html#/
```

## 部署

```bash
$ npm start
$ npm stop
```

## 基于本项目搭建新项目

### git clone

```bash
$ git clone https://gitee.com/developer-yoo-group/base-template-backend.git yoo-project-name
or
$ git clone git@github.com:Yoo-96/base-template-backend.git
```

### 修改package.json

修改项目名称和版本号：
```json
{
  "name": "base-template-backend",
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

