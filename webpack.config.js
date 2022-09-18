const path = require('path');
const ESLintPlugin = require('eslint-webpack-plugin');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

/**
 * 流程类的配置：包括缓存、并发、优化文件处理步骤等
 * 性能优化：
 * 1、构建性能
 * 2、应用性能
 */
module.exports = {
  /** 输入输出 start */
  /**
   * 入口文件：webpack会以entry作为入口文件，使用拓扑排序的方式 逐一递归将依赖进行打包处理
   * 1、三种形式 - 数组，字符串，对象，函数方式
   * */
  entry: path.join(__dirname, './src/index.js'),
  // entry: {
  //   index: path.join(__dirname, './src/index.js'),
  //   search: path.join(__dirname, './src/search.js'),
  // },
  /**
   * 输出：
   */
  output: {
    filename: '[name]-[fullhash:8]-bundle.js',
    path: path.join(__dirname, './dist'),
  },
  /** 输入输出 end  */

  /**  模块处理  start */
  // 用于配置模块路径解析规则
  resolve: {
    // 后缀名列表
    extensions: ['.js', '.ts', '.jsx'],
    alias: {
      '@src': path.join(__dirname, './src'),
      '@pages': path.join(__dirname, './src/pages'),
      '@components': path.join(__dirname, './src/pages/components'),
    },
  },
  // 仅用于解析 webpack 的 loader 包
  resolveLoader: {
    modules: [path.join(__dirname, './loaders'), 'node_modules'],
  },
  // 模块处理配置
  module: {
    rules: [{
      test: /\.tpl$/,
      use: ['babel-loader', {
        loader: 'tpl-loader',
        options: {
          log: true,
        },
      }],
    }, {
      test: /\.jsx?$/,
      use: ['babel-loader', {
        loader: 'hello-loader',
        options: {
          author: '焦糖瓜子',
          email: '123456@qq.com',
        },
      }],
      exclude: /node_modules/,
    }, {
      test: /\.tsx?$/,
      use: 'ts-loader',
    }, {
      // 处理css、less
      test: /.(c|le)ss$/,
      // loader的执行顺序： 从右往左 逐步调用
      /**
       * development: 使用style-loader以内部样式 style标签嵌入文档流中
       * production: 使用mini-css-extract-webpack-plugin抽离css文件，以外部样式 link的方式引入
       * */
      use: ['style-loader', 'css-loader'],
    }, {
      test: /\.(png|jpg|gif)$/g,
      // type: 'asset/resource',
      use: 'file-loader',
      type: 'javascript/auto',
    }],
  },
  /** *  模块处理  end  */
  /** 后处理 start */
  mode: 'development',
  plugins: [
    // 配置eslint规范， 需要搭配 .eslintrc
    new ESLintPlugin(),
    // 构建打包时，自动清除dist目录
    new CleanWebpackPlugin(),
    // 自动将bundle文件引入html模板中
    new HTMLWebpackPlugin({
      template: path.join(__dirname, './src/index.html'),
      filename: 'index.html',
    }),
    // new HTMLWebpackPlugin({
    //   template: path.join(__dirname, './src/search.html'),
    //   filename: 'search.html',
    // }),
  ],
  optimization: {
    // 分包配置
    splitChunks: {
      chunks: 'all',
      minChunks: 1,
      minSize: 10,
    },
  },
  externals: {
    react: 'React',
    'react-dom': 'ReactDOM',
  },
  /** 后处理 end */

  /**
   * 工具类
   *   开发效率类：watch devServer devtool
   *   性能优化类： cache performance
   *   日志类： stats
   * */
  watch: true,
  devtool: 'source-map',
};
