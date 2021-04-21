/* 配置example的vue-cli-service服务 */
const path = require('path')

const demoDirName = `examples/`

module.exports = {
  publicPath: '/',
  pages: {
    // spa应用入口配置
    index: {
      entry: path.join(demoDirName, 'main.js'),
      template: './public/index.html',
      // 构建之后的html名称
      filename: 'demo.html',
      // 页面标题
      title: 'Demo Page',
      chunks: ['index', 'chunk-vendors']
    }
  },
  outputDir: process.env.BUILD_DIR,
  // 本地服务配置
  devServer: {
    // 端口号
    port: process.env.SERVER_PORT,
    // 不启用浏览器自动打开服务
    open: true
  },
  // webpack定制
  configureWebpack: {
    devtool: process.env.NODE_ENV === 'production' ? 'hidden-source-map' : 'inline-source-map',
    optimization: {
      // 切割chunks
      splitChunks: {
        chunks: 'async',
        minSize: 20000,
        minChunks: 1,
        maxAsyncRequests: 30,
        maxInitialRequests: 30,
        enforceSizeThreshold: 50000,
      }
    },
    output: {
      crossOriginLoading: 'anonymous',
      // 解决webpack3 和 webpack4 runtime 默认函数webpackJsonp冲突
      jsonpFunction: 'webpack4JsonpIsArray'
    }
  }
}
