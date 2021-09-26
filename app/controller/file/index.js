/**
 *@BelongsProject: base-template-backend
 *@Author: yoo
 *@CreateTime:
 *@Description: 文件模块
 */
'use strict';
const Controller = require('egg').Controller;
const mime = require('mime-types');
const sendToWormhole = require('stream-wormhole');
const { readFileSync, unlinkSync } = require('mz/fs');
const path = require('path');

class FileController extends Controller {
  // 图片上传
  async uploadImage() {
    const { ctx } = this;
    const file = ctx.request.files[0];

    const extension = mime.extension(file.mimeType);

    const whitelist = [ 'jpg', 'jpeg', 'png', 'gif', 'bmp' ];
    if (!whitelist.includes(extension)) {
      await sendToWormhole(file);
      return ctx.helper.fail(ctx, { msg: '请上传/jpg/jpeg/png/gif/bmp格式' });
    }

    // const result = await ctx.service.file.index.uploadToQiniu(file);
    const result = await ctx.service.file.index.uploadToCOS(file);
    // const result = await ctx.service.file.index.uploadToLocal(file, 'local/images');
    if (result) {
      ctx.helper.success(ctx, result);
    } else {
      return ctx.helper.fail(ctx, { msg: '上传失败，请稍后重试！' });
    }
  }
  // 本地图片预览
  async imagePreview() {
    const { ctx, app } = this;
    const { file } = ctx.query;

    const uploadBasePath = app.config.upload_base_path + '/local/images';
    const filePath = path.join(uploadBasePath, file);

    try {
      const mimeType = mime.lookup(filePath);
      const file = readFileSync(filePath);
      ctx.set('content-type', mimeType);
      ctx.body = file;
    } catch (error) {
      ctx.status = 404;
      ctx.body = '访问资源不存在';
    }
  }
  // 腾讯cos图片预览
  async imagePreviewToCOS() {
    const { ctx, app } = this;
    const { file } = ctx.query;
    const result = await ctx.service.file.index.imagePreviewToCOS(file);
    if (result.statusCode === 404) {
      ctx.status = 404;
      ctx.body = '访问资源不存在';
      return;
    }

    const uploadBasePath = app.config.upload_base_path + '/cos';
    const filePath = path.join(uploadBasePath, file);

    try {
      const mimeType = mime.lookup(filePath);
      const file = readFileSync(filePath);
      ctx.set('content-type', mimeType);
      ctx.body = file;
      unlinkSync(filePath);
    } catch (error) {
      ctx.status = 404;
      ctx.body = '访问资源不存在';
    }
  }
}

module.exports = FileController;
