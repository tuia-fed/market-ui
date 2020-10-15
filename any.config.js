module.exports = {
  name: 'mk', // 构建的仓库名称
  build: {
    src: 'packages', // 源码，默认src
    framework: 'vue', // 使用的框架，默认 undefined
    css: {
      base: 'shared/style/index.less', // 每个组件使用的公共样式文件， 默认 undefined
      preprocessor: 'less' // 使用的css预处理器，默认 css
    }
  }
}
