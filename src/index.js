import bar from '@pages/bar';
import layout from '@components/Layout/layout';
// loader期望： 获取节点，生成一个innerHTML插入节点中
import tpl from './info.tpl';

import './index.css';

// tpl 能够传入参数，并返回对应的对应数据
const foo = tpl({
  name: '焦糖瓜子',
  age: 28,
  career: '前端开发工程师',
  hobby: '编码',
});

console.log('barr: ', bar?.moduleName, layout.moduleName, foo);
