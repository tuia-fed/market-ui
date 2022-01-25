# 开发指南

感谢你使用MarketUI，以下是关于向 MarketUI 提交反馈或代码的指南。
在向 MarketUI 提交 [issue](https://github.com/tuia-fed/market-ui/issues) 或者 [PR](https://github.com/tuia-fed/market-ui/pulls) 之前，请先花几分钟时间阅读以下文字。

# 参与开发

## 本地开发

* 按照以下的步骤操作，即可在本地开发 MarketUI 组件

```bash
# 克隆仓库
# 默认为 dev 分支
git clone 

# 安装依赖
yarn

# 进入开发模式，浏览器访问 http://localhost:8080
yarn serve
```

## 目录结构

* 仓库的组件代码在`src`下，每个组件对应一个文件夹
* docs 目录下是文档网站的代码
项目主要目录如下：
```
Market-UI
├─ docs      # 文档
├─ examples  # 组件使用案例
├─ plugins   # 插件
├─ src       # 组件
└─ types     # 类型
```

## 添加新组件

* 直接运行以下bash命令：

```bash
yarn create:new
```