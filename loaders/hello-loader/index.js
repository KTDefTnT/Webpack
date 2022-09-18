/**
 * @hulu
 * @param {*} source 源代码
 * 功能 - 在每个js的头部增加一author、data
 */
function helloLoader(source) {
  const { author = null, email = null } = this.getOptions();
  return `
    /**
     * Author - ${author}
     * Email - ${email}
    */
    ${source}
  `;
}

module.exports = helloLoader;
