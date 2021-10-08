/**
 *@BelongsProject: base-template-backend
 *@Author: yoo
 *@CreateTime: 2021-09-30 09:56
 *@Description:  附件表 AttachmentLog模型
 */
'use strict';

const db = require('../../../utils/db.js');

module.exports = app => {
  const { STRING, TINYINT } = app.Sequelize;

  const AttachmentLog = db.defineModel(app, 'attachment_log', {
    attachmentId: {
      type: STRING,
      comment: '附件ID',
    },
    operationType: {
      type: TINYINT,
      comment: '操作类型, 1: 新增, 2: 更新, 3: 删除, 4: 下载',
    },
    createUser: {
      type: STRING,
      comment: '创建人',
    },
  }, {
    comment: '附件操作日志表',
  });

  AttachmentLog.sync({ alter: true });
  return AttachmentLog;
};
