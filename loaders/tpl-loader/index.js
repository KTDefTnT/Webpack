// const loaderUtils = require('loader-utils');
const { tplReplace } = require('../utils');
/**
 * loader本质是一个函数，参数： 源代码，返回值： 返回新的代码字符串
 * 字符串拼接！！！
 * 正则表达式！！！
 * 导出一个函数 字符串
 */
function tplLoader(source) {
  const { log } = this.getOptions();
  const logText = log ? `console.log('compiled this file which is from ${this.resourcePath}')` : '';
  // 去除空格
  const formatSource = source.replace(/\s+/g, '');
  // return source;
  return `export default function(options){
    // 定义一个函数
    ${tplReplace.toString()}
    ${logText}
    // 返回函数，并将参数传入函数中
    return tplReplace('${formatSource}', options);
  }`;
}

// 期待返回的结果
/**
 * const foo = tpl({
    name: '焦糖瓜子',
    age: 28,
    career: '前端开发工程师',
    hobby: '编码',
  });
 */

// function tpl(options) {
//   function tplReplace(template, replaceObj) {
//     return template.replace(/\{\{(.*)?\}\}/g, (node, key) => replaceObj[key]);
//   }

//   return tplReplace(`${source}`, options);
// }

// loader运行在node环境中，需要使用CJS的写法进行导出
module.exports = tplLoader;
