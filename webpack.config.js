const path = require('path');
const ESLintPlugin = require('eslint-webpack-plugin')


module.exports = {
  /** 输入输出 start */
  /**
   * 入口文件：webpack会以entry作为入口文件，使用拓扑排序的方式 逐一递归将依赖进行打包处理
   * 1、三种形式 - 数组，字符串，对象，函数方式
   * */ 
  entry: path.join(__dirname, './src/index.js'),
  /**
   * 输出： 
   */
  output: {
    filename: '[name]-[fullhash:8].js',
    path: path.join(__dirname, './dist'),
  },
  /** 输入输出 end  */

  /**  模块处理  start */ 
  // 用于配置模块路径解析规则
  resolve: {
    // 后缀名列表
    extensions: ['.js', '.ts'],
    alias: {
      '@src': path.join(__dirname, './src'),
      '@pages': path.join(__dirname, './src/pages'),
      '@components': path.join(__dirname, './src/pages/components'),
    },
  },
  // 模块处理配置
  module: {
    rules: [{
      test: /\.js$/,
      use: 'babel-loader'
    }, {
      test: /\.tsx?$/,
      use: 'ts-loader'
    }]
  },
  /***  模块处理  end  */
  /** 后处理 start */
  mode: 'production',
    plugins: [
      // 配置eslint规范， 需要搭配 .eslintrc
      new ESLintPlugin(),
    ]
  /** 后处理 end */
};