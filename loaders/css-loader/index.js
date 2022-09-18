/**
 * 处理 css文件的依赖和资源的加载 - 实现两个功能
 * 1、@import的实现 - 可无限嵌套，先使用深度遍历，将最底层的一一import
 * 2、图片资源的导入
 */
const fs = require('fs');
const path = require('path');

// 匹配图片正则
const urlReg = /url\(['|"](.*)['|"]\)/g;
// 匹配@import正则, 0个或多个import
const importReg = /(@import ['"](.*)['"];)?/g;

// 从下往上遍历，直到找到没有@import的文件
async function getImport(context, resourcePath, content) {
  let newContent = content;
  let regRes;
  let imgRes;
  // 获取当前处理文件的父目录
  const absolutePath = resourcePath.slice(0, resourcePath.lastIndexOf('/'));
  // 深度优先遍历，若当前文件中存在@import 关键字，则不断进行匹配
  // todo 复习正则表达式
  // eslint-disable-next-line no-cond-assign
  while (regRes = importReg.exec(newContent)) {
    const importExp = regRes[1];
    if (!importExp) break;
    const url = regRes[2];
    console.log(regRes);

    // 获取import导入的css文件的绝对路径
    // todo 熟悉 path.resolve,path.join等方法的操作方式
    /**
     * info 如果处理完全部给定的 path 片段后还未生成一个绝对路径，则当前工作目录会被用上。
     * path.join('/foo', 'bar', 'baz/asdf', 'quux', '..');
     * 返回: '/foo/bar/baz/asdf'
     * path.resolve('wwwroot', 'static_files/png/', '../gif/image.gif');
     *
     * info 后续字符以 / 开头，不会拼接到前面的路径
     * 如果当前工作目录为 /home/myself/node，
     * 则返回 '/home/myself/node/wwwroot/static_files/gif/image.gif'
     */
    // file: /Users/10026468/Documents/学习/Webpack/juejin-webpack/webpack-basic/src/assets/inner.css
    const fileAbsoluteUrl = url?.startsWith('.') ? path.resolve(absolutePath, url) : url;
    // 读取目标文件的内容
    // todo fs文件系统
    const transformResult = fs.readFileSync(fileAbsoluteUrl, { encoding: 'utf-8' });
    // console.log(transformResult, importExp, 'content', newContent);
    // 将@import 关键字替换成文件读取的内容
    // ? 如果两者都存在图片的引入，图片位置是以当前的css文件为相对路径进行引入，
    // ? 每次引入一个css，则需要先将transformResult的图片路径进行转译
    newContent = newContent.replace(importExp, transformResult);
    // 递归处理更新后的内容
    // eslint-disable-next-line no-await-in-loop
    newContent = await getImport(context, fileAbsoluteUrl, newContent);

    // 每次遍历时，需要处理当前文件中的图片引入
    // ? 将图片处理的方法抽离成一个抽象方法
    // eslint-disable-next-line no-cond-assign
    while (imgRes = urlReg.exec(newContent)) {
      // ./assets/logo.png
      const imgUrl = imgRes[1];
      // 获取url方式引入图片的父目录
      // /Users/10026468/Documents/学习/Webpack/juejin-webpack/webpack-basic/src/assets
      // const absoluteImgPath = fileAbsoluteUrl.slice(0, absolutePath.lastIndexOf('/'));
      // 引入图片的绝对路径
      const imgAbsoluteUrl = imgUrl?.startsWith('.') ? path.resolve(absolutePath, imgUrl) : imgUrl;

      if (fs.existsSync(imgAbsoluteUrl)) {
        // 调用图片相关的loader进行处理
        // eslint-disable-next-line no-await-in-loop
        const transformImgResult = await context.importModule(imgAbsoluteUrl, {});
        // 将图片loader处理完成的内容替换为url
        newContent = newContent.replace(imgUrl, transformImgResult);
      }
    }
  }

  return newContent;
}

module.exports = async function cssLoader(source) {
  const callback = this.async();
  let newContent = source;

  try {
    newContent = await getImport(this, this.resourcePath, source);

    // 需要将当前的文件进行导出，后续webpack打包会将此当成一个js文件来处理
    callback(null, `module.exports = ${JSON.stringify(newContent)}`);
  } catch (error) {
    callback(error, '');
  }
};
