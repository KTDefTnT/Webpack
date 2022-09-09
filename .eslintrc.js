const path = require('path');

/**
 * eslint中文文档：https://eslint.bootcss.com/docs/user-guide/configuring
 * react项目中jsx文件依赖于  插件「eslint-plugin-jsx-a11y」
 * 有三种主要的方式来配置 ESLint
 * 【1】js代码中通过注释方式使用
 * 【2】通过配置化文件的方式使用，配置文件有多种方式， js文件、json文件、yaml文件等
 * 【3】若有一个配置文件package.json，ESLint 只有在无法找到其他配置文件时才使用它
 */
module.exports = {
  root: true,
  /**
   * 运行环境 https://eslint.bootcss.com/docs/user-guide/configuring#specifying-environments
   * 可以在源文件里、在配置文件中或使用 命令行 的 --env 选项来指定环境
   * 如果你想在一个特定的插件中使用一种环境，确保提前在 plugins 数组里指定了插件名，
   * 然后在 env 配置中不带前缀的插件名后跟一个 / ，紧随着环境名
   * "plugins": ["example"],
   *  "env": {
   *     "example/custom": true
   * }
   */
  env: {
    browser: true,
    node: true,
  },
  // 必须指定语言版本和模块类型，或者指定解析插件 parser， 不然对于import，const等保留字会报错
  /**
   * 解析器：https://eslint.bootcss.com/docs/user-guide/configuring#specifying-parser
   * 【1】ESLint 默认使用Espree作为其解析器
   * 【2】可以自定义一个解析器，但 1、解析器必须是一个Node模块；2、必须复核 parser interface
   * 【解析器】
   * 1、Esprima
   * 2、babel-eslint babel解析器的包装，但已被废弃？  使用@babel/eslint-parser替代
   * 3、@typescript-eslint/parser - 将 TypeScript 转换成与 estree 兼容的形式，以便在ESLint中使用
   */
  parser: '@babel/eslint-parser',
  /**
   * 解析器配置项 https://eslint.bootcss.com/docs/user-guide/configuring#specifying-parser-options
   * 即使有配置解析器，配置属性 parserOptions 仍然是必须的。解析器会被传入 parserOptions，但是不一定会使用它们来决定功能特性的开关
   * 可选的属性
   * 【1】ecmaVersion: 指定想要使用的ECMAScript版本，默认为3，5
   * 【2】sourceType：script|module(ECMAScript模块)
   * 【3】ecmaFeatures： 指定额外的语言特性
   *     【3.1】globalReturn： 允许全局作用域下使用return语句
   *     【3.2】impliedStrict：启用全局 strict mode
   *     【3.3】jsx： 启用JSX
   */
  parserOptions: {
    ecmaFeatrue: {
      jsx: true,
    },
    ecmaVersion: 7,
    sourceType: 'module',
  },
  /**
   * 插件 https://eslint.bootcss.com/docs/user-guide/configuring#configuring-plugins
   * eslint支持第三方插件，但是在使用插件之前必须使用npm先安装
   * 【1】插件名称可以忽略 eslint-plugin-前缀
   * 【2】插件主要用户扩展解析器的功能
   * import插件：用于解决使用webpack别名导入模块时的报错
   */
  plugins: ['react', 'react-hooks', 'import'],
  /**
   * 规则继承  https://eslint.bootcss.com/docs/user-guide/configuring#extending-configuration-files
   * 继承方式的种类
   * 【1】「eslint:recommended」- eslint内置的核心规则
   * 【2】可共享配置：一个npm包，extends属性值可以省列包名的前缀 eslint-config-
   * 【3】插件中获取输出规则： plugins可以忽略包名的前缀 eslint-plugin-, 配置方式[plugin:包名/配置名称] - plugin:react/recommended
   */
  extends: [
    'plugin:react/recommended',
    /**
     * airbnb解析
     * 【】有两种eslint规范，一种是自带了react插件的「eslint-config-airbnb」，一种是基础款「eslint-config-airbnb-base」
     * 【】airbnb-base 包括了ES6的语法检测，需要依赖 「eslint-plugin-import」
     * 在setting和rules里，都有 'import/xxx' 项目，这里修改的就是 eslint-plugin-import 配置
     */
    'airbnb'],
  /**
   * 规则共享参数 https://eslint.bootcss.com/docs/user-guide/configuring#extending-configuration-files
   * 【1】此配置对象，将被提供给每一个被执行的规则 - 即extends中的规则
   */
  settings: {
    /**
     * 注意，「import/resolver」并不是eslint规则项，与rules中的「import/extensions」不同。它不是规则项
     * 这里只是一个参数名，叫「import/resolver」，会传递给每个规则项。settings并没有具体的书写规则
     *
     * 「import/」只是import模块自己起的名字，原则上，它直接命名为「resolver」也可以，加上「import」只是为了更好地区分。不是强制设置的
     * 因为「import」插件很多规则项都用的这个配置项，所以并没有通过rules设置，而是通过settings共享
     * 具体使用方法可参考https://github.com/benmosher/eslint-plugin-import
     */
    'import/resolver': {
      /**
       * 「eslint-plugin-import」插件通过 「eslint-import-resolver-xxx(alias)」解析webpack配置项，
       * 并使用以下的参数 共享给 import规则，使其能正确识别import路径
       */
      alias: {
        map: [
          ['@src', path.join(__dirname, './src')],
          ['@pages', path.join(__dirname, './src/pages')],
          ['@components', path.join(__dirname, './src/pages/components')],
        ],
        extensions: ['.ts', '.js', '.jsx', '.json'],
      },
    },
  },
  // rules: {
  //   'import/extensions': [
  //     'error',
  //     'ignorePackages',
  //     {
  //       js: 'never',
  //       jsx: 'never',
  //       ts: 'never',
  //       tsx: 'never',
  //     },
  //   ],
  // },
};
