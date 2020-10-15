/* eslint-disable @typescript-eslint/no-var-requires */
const { resolve } = require('path')

module.exports = {
  chainWebpack: config => {
    config.module
      .rule('ts')
      .use('ts-loader')
      .loader('ts-loader')
      .tap(opts => {
        opts.transpileOnly = false
        opts.happyPackMode = true
        return opts
      })
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
