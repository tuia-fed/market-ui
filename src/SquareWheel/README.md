---
group: 基础玩法组件
level: 3
---

# 方形转盘

方形转盘是[大转盘](../Wheel)的**变体**（变体的详细说明可以查看[变体与预设](../../guide/presets)），但是只是复用了转盘的逻辑。其为`可控组件`（详细说明可查看[基础玩法组件逻辑规范](../../guide/basic-rule)）

另外，一个大转盘主要由**底盘**、**灯光**(未支持)、**格子底**、**格子遮罩**、**开始按钮**等组成，**暂时只支持九宫格形式**

## 按需引入

```js
import Vue from 'vue'
import SquareWheel from '@tuia/market-ui/lib/SquareWheel'
import '@tuia/market-ui/lib/SquareWheel/style'

Vue.use(SquareWheel)
```

## 代码演示

<<< @/src/SquareWheel/demo/index.vue#html

<details>

<summary>点击展开完整代码</summary>

<<< @/src/SquareWheel/demo/index.vue#js

</details>

# SquareWheel API

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
| containerImg | 底盘图片 | _string_ | `//yun.tuisnake.com/market-ui/80775426-025f-44ab-8374-d3bc03e15b9b.png` |
| gridStyle | 每个格子的样式 | _StyleType_ | `{ width: 200, height: 200 }` |
| gridBottomImg | 格子底部图片 | _string_ | `//yun.tuisnake.com/market-ui/ac59e2bb-df18-47cc-bb29-f121366cefb7.png` |
| gridMaskImg | 格子灰色遮罩图片 | _string_ | `//yun.tuisnake.com/market-ui/a998b80c-d270-4f13-96a6-13fcb31f150c.png` |
| gridHorizontalSpace | 格子横向间距 | _number_ | `6` |
| gridVerticalSpace | 格子纵向间距 | _number_ | `6` |
| btnImg | 开始按钮图片 | _string_ | `//yun.tuisnake.com/market-ui/a6897dca-63b7-4a1b-8ab4-48c305f7b1ef.png` |
| btnDisableImg | 开始按钮禁用图片 | _string_ | `//yun.tuisnake.com/market-ui/6d09d7aa-c799-446b-949e-72ac5cdf97f8.png` |
| handStyle | 手势样式 | _StyleType_ | `{ width: 160, height: 170, top: 390, left: 400 }` |
| handImg | 手势图片 | _string_ | `//yun.tuisnake.com/tact/turnCircle/bcb4fc7e-18c1-46d7-bdae-2e91147196c1.png` |
| prizeImgStyle | 奖品图片样式 | _StyleType_ | `{ width: 120, height: 120, top: 15 }` |
| prizeTextStyle | 奖品标题样式 | _StyleType_ | `{ width: 180, height: 50, 'line-height': 50, top: 135, 'font-size': 24 }` |
| prizeList | 奖品列表（当前仅支持8个） | _PrizeType[]_ | `[...]` |
| idleTurningSpeed | 转盘闲置每秒转动度数（闲置转速） | _number_ | `24` |
| maxTurningSpeed | 转盘运行每秒转动度数（最大转速） | _number_ | `900` |
| rangePercent | 指针命中区域范围：0-1 | _number[]_ | `[0.01, 0.02]` |

## Slots
| 名称 | 作用域 | 说明 |
| --- | --- | --- |
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