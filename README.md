# tuia-market-ui

## 项目介绍
* 本项目运行时通过`concurrently`同时开启`vuepress`和`vue-cli-service`服务，前者用于启动文档服务，后者用于启动demo预览服务

### vuepress路由
* vuepress路由生成规则——自动根据docs目录下的`.md`文档生成默认的路由地址，不需要手动注册

### 侧边栏分组、顺序配置规则
* 由于侧边栏是自定义主题，所以对应的`sidebar`不需要走默认配置，本项目利用`vuepress`对`Front Matter`的支持来进行自定义配置，配置项示例如下：
```js
---
group: 基础组件
level: 1
---
/**
 * group——当前分组的名称
 * level——当前路由在所在分组内的level位置
 * **/
```

### README.md文档如何引入demo源码
* 利用了`vuepress`支持直接导入源文件的代码段，分为两步：
```js
// 1. 划分区块

// #region js
export default {
  data() {

  },
  methods: {

  },
  mounted() {

  }
}
// #endregion js
/* #region——#endregion内部包裹的是可以引入的代码区块, js是区块的标识, 用于分段展示 */

// 2. README.md 引入区块代码
<<< @/../market-ui/src/wheel/demo/index.vue#js
// '<<< @/../'指向的是机器根地址, @——process.cwd(), 后面跟被引入文件的绝对路径
```
## 开发规范
* 组件核心代码、demo和README统一放在`src/*`目录下，方便开发和维护

## 构建
* 基于`mkui`构建工具打包，`es`目录下构建出来的是基于`esm`——ES模块文件，`lib`目录构建出的是`umd`规范，以`amd`、`cjs`、`iife`为一体的通用模块文件

## 关于hooks
* 在React的生态内，`hooks`被用于抽象通用逻辑的最好方式，因此可以借鉴其思想，将组件的通用逻辑抽象出来，同组件完全独立，只输出一个响应式的对象变量和一些操作该变量的方法。在本项目中，所有抽离出的逻辑全部放在`./src/hooks`目录下，`mkui-cli`会单独打包并对外独立暴露出来，方便组件调用。
