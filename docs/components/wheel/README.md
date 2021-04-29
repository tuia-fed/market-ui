---
group: 2 | 业务组件
level: 1
---

# Wheel 大转盘

## 介绍
* 一个圆形的转盘，按照一定的速率转动停下之后，指针指向的位置就是抽中的奖品

## 引入
```js
import Vue from 'vue'
import { Wheel } from '@tuia/market-ui'

Vue.use(wheel)
```

# 基础用法

## 代码演示
<details>

<summary>点击展开完整代码</summary>

<<< @/../market-ui/src/wheel/demo/extend.js#snippet

</details>

# API

## Props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| angle | 角度，转盘转动的角度 | _number_ | `0` |
| size | 尺寸， 圆形转盘的尺寸 | _number_ | `300` |

## Slots
| 名称 | 说明 |
| --- | --- |
| default | 转盘内的奖品分布 |
