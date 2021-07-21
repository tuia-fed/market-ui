---
group: 互动组件
level: 4
---

# 套圈
前方的物品（一般是🐱 ），在快乐的左右移动着，用户点击套圈操控按钮，抛出绳索，随机套住一只最近的奖品--恭喜发财。

## 引入

```js
import Vue from 'vue'
import { RingToss } from '@tuia/market-ui'

Vue.use(RingToss)
```

## 代码演示

<<< @/src/RingToss/demo/index.vue#html

<br />

<details>

<summary>点击展开完整代码</summary>

<<< @/src/RingToss/demo/index.vue#js

</details>

# API

## Props
| 参数 | 说明 | 类型 | 是否是必须参数 | 默认值 |
| --- | --- | --- | --- | --- |
| ringSource | 渲染初始化状态，奖品的图片资源列表，`string[]` | _array_ | 是 | 无 |
| catchRingSource | 渲染被绳索套住状态，奖品的图片资源列表, `string[]` | _array_ | 是 | 无 |
| escapeRingSource | 渲染逃逸状态，奖品的图片资源列表, `string[]` | _array_ | 是 | 无 |

## 方法
* 通过`ref`可以获取到`RingToss`实例并调用实例方法

| 方法名 | 说明 |
| --- | --- |
| catchRing | 抛绳索开始抓奖品 |
| hideRing | 隐藏其他未抓住的奖品 |
| notCatchRing | 套圈失败 |
| resetRing | 重置套圈状态 |
