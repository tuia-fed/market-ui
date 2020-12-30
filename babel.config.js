if (process.env.BUILD_TARGET === 'package') {
  module.exports = {
    presets: [
      ['@vant/cli/preset', { loose: process.env.BUILD_TARGET === 'package' }]
    ],
    plugins: ['@babel/plugin-proposal-class-properties']
  }
} else {
  module.exports = {
    presets: ['@vue/cli-plugin-babel/preset']
  }
}
