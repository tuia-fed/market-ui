# tuia-market-ui

## 项目介绍
* 本项目运行时通过`concurrently`同时开启`vuepress`和`vue-cli-service`服务，前者用于启动文档服务，后者用于启动demo预览服务

## 项目存在的开发流程问题
* `src`目录下组件的`README.md`文档是通过`node-vuepress-components`手动拷贝到`doc/components`目录下，再通过`vuepress-bar`插件自动生成`sidebar`侧边栏路由结构，还无法做到自动化生成。

## 开发规范
* 组件核心代码、demo和README统一放在`src/组件`目录下，方便开发和维护
