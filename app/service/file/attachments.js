/**
 *@BelongsProject: base-template-backend
 *@Author: yoo
 *@CreateTime: 2021-09-30 10:07
 *@Description: 附件模块
 */
'use strict';
const Service = require('egg').Service;

class AttachmentsService extends Service {
  // 创建附件记录
  async saveAttachment ({ fileName, writeInName, mimeType, extension, size, url, folderName, createUser }) {
    const { ctx } = this;
    return await ctx.model.File.Attachments.create({ fileName, writeInName, mimeType, extension, size, url, folderName, createUser });
  }
  // 更新附件业务id
  async updateAttachmentBusinessId ({ id, businessId }) {
    const { ctx } = this;
    return await ctx.model.File.Attachments.update({ businessId }, {
      where: { id },
    });
  }
  // 根据id查询附件记录
  async getAttachmentById (id) {
    const { ctx } = this;
    const detail = await ctx.model.File.Attachments.findOne({
      where: { id },
    });
    if (detail) {
      return detail;
    }
    return false;
  }
}

module.exports = AttachmentsService;
