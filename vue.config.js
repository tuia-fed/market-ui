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
    output: {
      libraryExport: 'default'
    }
  }
}
