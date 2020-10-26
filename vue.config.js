const { resolve } = require('path')

module.exports = {
  chainWebpack: config => {
    // config.module.rule('md')
    //   .test(/\.md/)
    //   .use('')
    //   .loader('vue-loader')
    //   .end()
    //   .use('vue-markdown-loader')
    //   .loader('vue-markdown-loader/lib/markdown-compiler')
    //   .options({
    //     raw: true
    //   })
  },
  pluginOptions: {
    'style-resources-loader': {
      'preProcessor': 'less',
      'patterns': [
        resolve(__dirname, './src/shared/style/index.less'),
      ]
    }
  },
  configureWebpack: {
    resolve: {
      alias: {
        '@': resolve('src'),
        packages: resolve('packages')
      }
    }
  }
}
