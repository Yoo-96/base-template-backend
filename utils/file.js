'use strict';
const { existsSync, mkdirSync } = require('mz/fs');
const hasha = require('hasha');
const mime = require('mime-types');
const path = require('path');

/**
 * 获取文件hash名
 * @param file
 * @returns {Promise<{fileHash: string, fileName: string}>}
 */
const getFileHashName = async (file) => {
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
 * @param app
 * @param fileName
 * @param folderName
 * @returns {string}
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
 * @param filePath
 * @param fileHash
 * @returns {Promise<*>}
 */
const checkFileExisted = async (filePath, fileHash) => {
  let isFileExisted = existsSync(filePath);
  if (isFileExisted) {
    const oldFileHash = await hasha.fromFileSync(filePath, { algorithm: 'md5' });
    isFileExisted = oldFileHash === fileHash;
  }
  return isFileExisted;
};

module.exports = {
  getFileHashName,
  getFilePath,
  checkFileExisted,
};
