# 快速上手

* 通过本章节你可以了解到 MarketUI 的安装方法和基本使用姿势

# 安装

* 在现有项目中使用 MarketUI 时，可以通过`npm`或`yarn`进行安装：

```bash
yarn add @tuia/market-ui
```

# 引入组件

## 方法一、全量导入所有组件

```js
import Vue from 'vue'
import MarketUI from '@tuia/market-ui'
import '@tuia/market-ui/index.less'

Vue.use(MarketUI)
```

## 方法二、手动按需引入组件

```js
import TurnCard from '@tuia/market-ui/lib/TurnCard'
import '@tuia/market-ui/lib/TurnCard/style'
```
