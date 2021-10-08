/**
 *@BelongsProject: base-template-backend
 *@Author: yoo
 *@CreateTime:
 *@Description: 文件公共方法
 */
'use strict';
const { existsSync, mkdirSync, stat } = require('mz/fs');
const hasha = require('hasha');
const mime = require('mime-types');
const path = require('path');
const { generateUUID } = require('./utils');

/**
 * 获取文件hash名
 * @param {*} file 文件流
 * @return {Promise<{fileHash: string, fileName: string}>} 返回文件hash名
 */
const getFileHashName = async file => {
  const extension = mime.extension(file.mimeType);
  const fileHash = await hasha.fromFileSync(file.filepath, { algorithm: 'md5' });
  const fileName = `${fileHash}.${extension}`;
  return {
    fileHash,
    fileName,
  };
};

/**
 * 获取文件路径
 * @param {*} app app实例
 * @param {string} fileName 文件名
 * @param {string} folderName 文件夹名称
 * @return {string} 返回文件路径
 */
const getFilePath = (app, fileName, folderName) => {
  const uploadBasePath = app.config.upload_base_path + '/' + folderName; // 文件夹路径

  const isDirExisted = existsSync(uploadBasePath);
  // 判断文件夹是否存在
  if (!isDirExisted) {
    mkdirSync(uploadBasePath, {
      recursive: true,
    });
  }

  return path.join(uploadBasePath, fileName); // 文件路径
};

/**
 * 检验文件是否已存在
 * @param {string} filePath 文件路径
 * @param {string} fileHash 文件hash名称
 * @return {Promise<*>} 返回是否存在该文件
 */
const checkFileExisted = async (filePath, fileHash) => {
  let isFileExisted = existsSync(filePath);
  if (isFileExisted) {
    const oldFileHash = await hasha.fromFileSync(filePath, { algorithm: 'md5' });
    isFileExisted = oldFileHash === fileHash;
  }
  return isFileExisted;
};

/**
 * 生成UUID文件名
 * @param {string} extension 文件扩展名
 * @returns {string} 返回UUID文件名
 */
const getUUIIFileName = (extension) => {
  return `${generateUUID()}.${extension}`
};

/**
 * 获取指定文件大小
 * @param {*} app app实例
 * @param {string} folderName 文件夹
 * @param {string} fileName 文件名
 * @returns {Promise<*>} 返回结果
 */
const getFileSize = async (app, folderName, fileName) => {
  const localPath = app.config.upload_base_path + '/' + folderName + '/' + fileName;
  const res = await stat(localPath);
  return res.size;
};

module.exports = {
  getFileHashName,
  getFilePath,
  checkFileExisted,
  getUUIIFileName,
  getFileSize,
};
