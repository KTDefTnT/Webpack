/* eslint-disable global-require */
const fs = require('fs');
const path = require('path');

let id = 0;

module.exports = function styleLoader(content) {
  // eslint-disable-next-line no-plusplus
  // todo 为什么是./id++???，  answer：写入的文件名称
  // eslint-disable-next-line no-plusplus
  const temp = path.resolve(__dirname, `./${id++}.js`);
  // 将ccss-loader生成的字符串写入文件
  fs.writeFileSync(temp, content);

  // 读取module.exports
  // eslint-disable-next-line import/no-dynamic-require
  const res = require(temp);
  // 删除文件
  fs.unlinkSync(temp);

  // 插入样式
  const insertStyle = `
    const style = document.createElement('style');
    style.innerHTML = ${JSON.stringify(res)};
    document.head.appendChild(style);
  `;

  return insertStyle;
};
