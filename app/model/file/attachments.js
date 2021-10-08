/**
 *@BelongsProject: base-template-backend
 *@Author: yoo
 *@CreateTime: 2021-09-30 09:24
 *@Description: 附件表 Attachment模型
 */
'use strict';

const db = require('../../../utils/db.js');

module.exports = app => {
  const { STRING } = app.Sequelize;

  const Attachment = db.defineModel(app, 'attachments', {
    fileName: {
      type: STRING,
      comment: '附件原始名字',
    },
    writeInName: {
      type: STRING,
      comment: '写入本地名称',
    },
    mimeType: {
      type: STRING,
      comment: '附件mimeType',
    },
    extension: {
      type: STRING,
      comment: '附件扩展名',
    },
    size: {
      type: STRING,
      comment: '附件大小',
    },
    url: {
      type: STRING,
      comment: '附件文件链接',
    },
    folderName: {
      type: STRING,
      comment: '所在文件夹',
    },
    businessId: {
      type: STRING,
      comment: '业务id',
    },
    createUser: {
      type: STRING,
      comment: '创建人',
    },
    updateUser: {
      type: STRING,
      comment: '最后更新人',
    },
  }, {
    comment: '附件表',
  });

  Attachment.sync({ alter: true });
  return Attachment;
};
