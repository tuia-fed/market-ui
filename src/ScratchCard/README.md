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

<<< @/src/scratchCard/demo/index.vue#html

<br />

<details>

<summary>点击展开完整代码</summary>

<<< @/src/scratchCard/demo/index.vue#js

</details>

# API

## ScratchCard Props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| moveRadius | 刮开时路径宽度 | _number_ | `20` |
| ratio | 自动清除其余区域时的比例 | _number_ | `0.3` |
| coverColor | 刮刮卡遮罩颜色 | _string_ | `#C5C5C5` |
| coverImg | 刮刮卡遮罩图片 | _string_ | 无 |
| startCallback | 开始刮卡的回调函数 | _function_ | `() => {}` |
| clearCallback | 刮开卡后的回调函数 | _function_ | `() => {}` |

## ScratchCard Slots
| 名称 | 说明 |
| --- | --- |
| default | 刮开后的奖品 |

## ScratchCard Events
| 名称 | 说明 | 入参 |
| --- | --- | --- |
| changeStatus | 改变刮卡状态,true暂停刮卡,false恢复,默认true | _boolean_ |
| reset | 重置刮刮卡 | 无 |
