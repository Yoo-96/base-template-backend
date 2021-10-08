/**
 *@BelongsProject: base-template-backend
 *@Author: yoo
 *@CreateTime: 2021-09-30 15:22
 *@Description: 附件日志
 */
const Service = require('egg').Service;

class AttachmentsService extends Service {
  // 添加附件操作日志
  async createAttachmentLog ({ attachmentId, operationType, createUser }) {
    const { ctx } = this;
    return await ctx.model.File.AttachmentLog.create({ attachmentId, operationType, createUser });
  }
}

module.exports = AttachmentsService;
