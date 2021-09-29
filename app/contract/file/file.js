/**
 *@BelongsProject: base-template-backend
 *@Author: yoo
 *@CreateTime: 2021-09-29 14:38
 *@Description: 附件管理 请求体和响应体
 */
module.exports = {
  // 图片上传响应体
  imageUploadResponse: {
    fileName: { type: 'string', example: '附件名称' },
    previewUrl: { type: 'string', example: '附件地址' },
  },
};

