---
group: 基础玩法组件
level: 1
---

# 大转盘

最古老的玩法之一，开始可以慢速转动。用户交互之后，让转盘快速转起来，并逐渐停留到某个位置。支持**不均分**转盘。其为`可控组件`（详细说明可查看[基础玩法组件逻辑规范](../../guide/basic-rule)）

另外，一个大转盘主要由**底盘**、**灯光**、**转盘**、**指针**、**开始按钮**等组成

## 按需引入

```js
import Vue from 'vue'
import Wheel from '@tuia/market-ui/lib/Wheel'
import '@tuia/market-ui/lib/Wheel/style'

Vue.use(Wheel)
```

## 代码演示

### 普通形式
<<< @/src/Wheel/demo/index.vue#html1

### 高级定制（不均分转盘）
<<< @/src/Wheel/demo/index.vue#html2

<details>

<summary>点击展开完整代码</summary>

<<< @/src/Wheel/demo/index.vue#js

</details>

# Wheel API

支持基本的[屏幕适配](../../guide/resolution)以及[基础玩法组件逻辑规范](../../guide/basic-rule)涉及的API

## 基本类型定义

```typescript
// 样式值定义
export type StyleValueType = string | number;
// 样式对象定义
export type StyleType = Record<string, StyleValueType>;

// 转盘上奖品类型定义
export interface PrizeType {
  title?: string;
  image?: string;
}
// 奖品信息定义
export interface PrizeInfoType {
  // 奖品信息
  item: PrizeType,
  // 奖品在列表中的位置
  index: number,
}
// stop方法入参
export interface WheelStopOptionType {
  // 命中目标索引
  index?: number;
}
```

## Props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| containerStyle | 底盘样式（包含整体位置） | _StyleType_ | `{ width: 750, height: 750, top: 0, left: 0 }` |
| containerImg | 底盘图片 | _string_ | `//yun.tuisnake.com/market-ui/e7185b56-1757-40f7-a921-f8c818d4c1a7.png` |
| lightStyle | 底盘灯样式 | _StyleType_ | `{ width: 750, height: 750 }` |
| lightImg | 底盘灯图片 | _string_ | `//yun.tuisnake.com/market-ui/d9d80c69-fe30-42a9-9794-e61f00193593.png` |
| rotateStyle | 转盘样式 | _StyleType_ | `{ width: 635, height: 635, top: 57.5 }` |
| rotateImg | 转盘图片 | _string_ | `//yun.tuisnake.com/market-ui/c31f472a-5be9-4296-9b0f-353b6583bbd9.png` |
| pointStyle | 指针样式 | _StyleType_ | `{ width: 270, height: 270, top: 240 }` |
| pointImg | 指针图片 | _string_ | `//yun.tuisnake.com/market-ui/0b7f2b9d-c63f-46fc-a851-edc2d47df9ab.png` |
| btnStyle | 开始按钮样式 | _StyleType_ | `{ width: 175, height: 175, top: 287.5 }` |
| btnImg | 开始按钮图片 | _string_ | `//yun.tuisnake.com/market-ui/db4540bd-8c5a-439d-bbb6-ea3f114c4902.png` |
| btnDisableImg | 开始按钮禁用图片 | _string_ | `//yun.tuisnake.com/market-ui/11c22d77-2e83-405b-85e8-c8832dc78529.png` |
| handStyle | 手势样式 | _StyleType_ | `{ width: 160, height: 170, top: 390, left: 400 }` |
| handImg | 手势图片 | _string_ | `//yun.tuisnake.com/tact/turnCircle/bcb4fc7e-18c1-46d7-bdae-2e91147196c1.png` |
| prizeImgStyle | 手势样式 | _StyleType_ | `{ width: 140, height: 140 }` |
| prizeTextStyle | 手势样式 | _StyleType_ | `{ width: 280, height: 50, 'font-size': 24 }` |
| prizeList | 奖品列表 | _PrizeType[]_ | `[...]` |
| prizePercent | 奖品转盘划分比例，默认（不传）均分 | _number[]_ | `undefined` |
| idleTurningSpeed | 转盘闲置每秒转动度数（闲置转速） | _number_ | `24` |
| maxTurningSpeed | 转盘运行每秒转动度数（最大转速） | _number_ | `900` |
| extraRotate | 初始转盘上奖品相对于转盘需要额外转动的度数 | _number_ | `0` |

## Slots
| 名称 | 作用域 | 说明 |
| --- | --- | --- |
| light | 无 | 底盘灯展示替换 |
| prize | _PrizeInfoType_ | 奖品展示替换 |
| hand | 无 | 手势替换 |

## Events
| 名称 | 参数 | 说明 |
| --- | --- | --- |
| clickStart | 无 | 开始按钮被点击时触发 |
| prizeClick | _PrizeInfoType_ | 奖品被点击时触发 |

## Methods
对于[基础玩法组件](../../guide/basic-rule)的`stop`方法入参做了限定，来确定命中目标
| 名称 | 入参 | 出参 | 说明 |
| --- | --- | --- | --- |
| stop | _WheelStopOptionType_ | _Promise_ | 结束方法 |