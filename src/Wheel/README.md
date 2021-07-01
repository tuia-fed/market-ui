---
group: 互动组件
level: 1
---

# 大转盘

最古老的玩法之一，开始可以慢速转动。用户交互之后，让转盘快速转起来，并逐渐停留到某个位置。
通过 useRorate 控制转盘的运动，并且提供了 Option 组件展示奖品选项，同时也支持插槽。

## 引入

```js
import Vue from 'vue'
import { Wheel, useRotate } from '@tuia/market-ui'

Vue.use(Wheel)
```

## 代码演示

<<< @/src/Wheel/demo/index.vue#html

<br />

<details>

<summary>点击展开完整代码</summary>

<<< @/src/Wheel/demo/index.vue#js

</details>

# API

## Wheel Props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| angle | 角度，转盘转动的角度 | _number_ | `0` |
| size | 尺寸， 圆形转盘的尺寸 | _number_ | `300` |

## Wheel Slots
| 名称 | 说明 |
| --- | --- |
| default | 转盘内的奖品分布 |

## WheelOption Props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| title | 奖项名称| _string_ | 无 |
| image | 奖项图片 | _string_ | 无 |

## WheelOption Slots
| 名称 | 说明 |
| --- | --- |
| default | 奖项内容 |

## WheelOption Events
| 名称 | 说明 |
| --- | --- |
| onClick | 奖项被点击 (index: number) => void |
