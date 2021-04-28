# tuia-market-ui

## 项目介绍
* 本项目运行时通过`concurrently`同时开启`vuepress`和`vue-cli-service`服务，前者用于启动文档服务，后者用于启动demo预览服务

### vuepress路由
* vuepress路由生成规则——自动根据docs目录下的`.md`文档生成默认的路由地址，不需要手动注册

### 侧边栏分组、顺序配置规则
* 由于侧边栏是自定义主题，所以对应的`sidebar`不需要走默认配置，本项目利用`vuepress`对`Front Matter`的支持来进行自定义配置，配置项示例如下：
```js
---
group: 3 | 基础组件
level: 1
---
/**
 * group——左侧数字是当前分组所在总sidebar路由的level位置,右侧是当前分组的名称
 * level——当前路由在所在分组内的level位置
 * **/
/* 注：group配置项必须要用`|`分割，否则无法正确解析 */
```

## 开发规范
* 组件核心代码、demo和README统一放在`src/*`目录下，方便开发和维护

## 构建
* 基于`mkui`构建工具打包，`es`目录下构建出来的是基于`esm`——ES模块文件，`lib`目录构建出的是`umd`规范，以`amd`、`cjs`、`iife`为一体的通用模块文件
