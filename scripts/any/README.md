# `@any/cli`

> 开箱即用的开发&构建工具

## 使用

```shell
yarn global add @any/cli
npm install @any/cli -g
```

### 构建vue+tsx组件库

```shell
any build-vue
```

### 构建react+tsx组件库

```shell
any build-react
```

### 构建站点

```shell
any build-site
```

## 配置文件

项目根目录，创建any.config.js

```javascript
module.exports = {
  name: 'any', // 构建的仓库名称
  build: {
    src: 'src/vue', // 源码，默认src
    framework: 'vue', // 使用的框架，默认 undefined
    css: {
      base: 'shared/style/index.less', // 每个组件使用的公共样式文件， 默认 undefined
      preprocessor: 'less' // 使用的css预处理器，默认 css
    }
  }
}
```
