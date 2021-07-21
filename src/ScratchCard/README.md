---
group: 互动组件
level: 4
---

## 刮刮卡
一个蒙层覆盖的区域，用户可以模拟刮彩票，容器背后的图片最终会显现出来。

## 引入

```js
import Vue from 'vue'
import { ScratchCard } from '@tuia/market-ui'

Vue.use(ScratchCard)
```

## 代码演示

<<< @/src/ScratchCard/demo/index.vue#html

<br />

<details>

<summary>点击展开完整代码</summary>

<<< @/src/ScratchCard/demo/index.vue#js

</details>

# API

## Props

| 参数 | 说明 | 类型 | 是否是必须参数 | 默认值 |
| --- | --- | --- | --- | --- |
| moveRadius | 刮开时路径宽度 | _number_ | 否 | `20` |
| ratio | 自动清除其余区域时的比例 | _number_ | 否 | `0.3` |
| coverColor | 刮刮卡遮罩颜色 | _string_ | 否 | `#C5C5C5` |
| coverImg | 刮刮卡遮罩图片 | _string_ | 否 | 无 |
| startCallback | 开始刮卡的回调函数 | _function_ | 否 | `() => {}` |
| clearCallback | 刮开卡后的回调函数 | _function_ | 否 | `() => {}` |

## Slots
| 名称 | 说明 |
| --- | --- |
| default | 刮开后的奖品 |

## 方法
* 通过`ref`可以获取到`ScratchCard`实例并调用实例方法

| 方法名 | 说明 | 参数 |
| --- | --- | --- |
| changeStatus | 改变刮卡状态,true暂停刮卡,false恢复,默认true | _boolean_ |
| reset | 重置刮刮卡 | 无 |
