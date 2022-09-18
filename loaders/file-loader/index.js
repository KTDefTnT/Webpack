/**
 * file-loader的作用 - 是一个 raw-loader
 * 1. 将图片输出到打包结果中
 * 2. 将打包结果的图片路径替换代码的路径
 */
const loaderUtils = require('loader-utils');

// todo 熟悉loader的接收参数
module.exports = function fileLoader(content, map = {}, meta = {}) {
  console.log('file-loader');
  // 判断是否被url-loader处理过， 若处理过则返回base64
  const { url, base64 } = meta;
  if (url) {
    return `module.exports = "${base64}"`;
  }
  // 根据上下文，生成一个文件路径，基于dist打包目录，文件地址是 dist/assetss/img.jpg
  // todo 熟悉loaderUtils中的方法
  const interpolateName = loaderUtils.interpolateName(
    this,
    'assets/[name].[contenthash].[ext][quesy]',
    { content },
  );

  console.log('interpolateName', interpolateName);
  // 生成一个文件
  this.emitFile(interpolateName, content);

  return `module.exports = "${interpolateName}"`;
};

// 标记为一个 raw-loader
module.exports.raw = true;
