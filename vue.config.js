const { resolve } = require('path')

module.exports = {
  chainWebpack: config => {
    config.module.rule('md')
      .test(/\.md/)
      .use('markdown-loader')
      .loader('markdown-loader')
      .end()
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
    resolveLoader: {
      modules: ['node_modules', './loaders/']
    },
    resolve: {
      alias: {
        '@': resolve(__dirname, 'src'),
        packages: resolve(__dirname, 'packages')
      }
    }
  }
}
