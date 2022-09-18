function tplReplace(template, replaceObj) {
  return template.replace(/\{\{(.*?)\}\}/g, (node, key) => replaceObj[key]);
}

module.exports = {
  tplReplace,
};
