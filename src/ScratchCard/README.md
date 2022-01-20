---
group: 基础玩法组件
level: 4
---

## 刮刮卡
一个蒙层覆盖的区域，用户可以模拟刮彩票，容器背后的图片最终会显现出来。其为`不可控组件`（详细说明可查看[基础玩法组件逻辑规范](../../guide/basic-rule)）

另外，一个刮刮卡主要由**背景**、**奖品**、**封面**、**刷子**等组成
## 按需引入

```js
import Vue from 'vue'
import ScratchCard from '@tuia/market-ui/lib/ScratchCard'
import '@tuia/market-ui/lib/ScratchCard/style'

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

支持基本的[屏幕适配](../../guide/resolution)以及[基础玩法组件逻辑规范](../../guide/basic-rule)涉及的API

## 基本类型定义

```typescript
// 样式值定义
export type StyleValueType = string | number;
// 样式对象定义
export type StyleType = Record<string, StyleValueType>;

// 宽高定义
export interface SizeType extends StyleType {
  width: number;
  height: number;
}
```
## Props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| containerStyle | 底盘样式（包含整体位置） | _StyleType_ | `{ width: 750, height: 465 }` |
| containerImg | 底盘图片 | _string_ | `//yun.tuisnake.com/market-ui/c6c0a01c-59e1-4317-bfa2-b46c361e9a3a.png` |
| scratchSize | 可刮区域宽高 | _SizeType_ | `{ width: 720, height: 405 }` |
| scratchStyle | 刮刮卡样式 | _StyleType_ | `{ left: 15, height: 30 }` |
| coverImg | 刮刮卡封面图片 | _string_ | `//yun.tuisnake.com/market-ui/71d1c715-17d2-426a-867f-da00c4647213.png` |
| coverDisableImg | 刮刮卡禁用时封面图片 | _string_ | `//yun.tuisnake.com/market-ui/71d1c715-17d2-426a-867f-da00c4647213.png` |
| coverColor | 刮刮卡封面兜底颜色 | _string_ | `#c5c5c5` |
| brushSize | 刮刮卡刷子宽高 | _SizeType_ | `{ width: 160, height: 100 }` |
| brushImg | 刮刮卡刷子图片 | _string_ | `//yun.tuisnake.com/market-ui/7fde6794-f9b4-49a1-8f08-44673bacbb23.png` |
| brushRadius | 刮的刷子兜底圆圈半径 | _number_ | `40` |
| prizeImg | 奖品图片 | _string_ | `//yun.tuisnake.com/market-ui/b16b8439-b6ee-4aa4-8c2a-c158c1ea613c.png` |
| coreRect | 奖品核心区域范围，用于判断刮的程度，数字数组（0-1）：[left, top, width, height] | _number[]_ | `[0.1, 0.1, 0.8, 0.8]` |
| endRatio | 当核心区域手动刮掉的面积达到这个值时，表示刮完了 | _number_ | `0.5` |
| enableAutoScratch | 当手动刮一次未达到结束标准时，是否触发自动刮开 | _boolean_ | `true` |
| autoScratchPath | 自动刮开路径，二维坐标数组（0-1）最后一项表示该路径耗时：[[x1, y1], [x2, y2, t2]] | _number[][]_ | `[[0.9, 0.1], [0.1, 0.27, 250], [0.96, 0.36, 250], [0.07, 0.62, 250], [0.96, 0.6, 250], [0.05, 0.85, 250]]` |
| tipsStyle | 提示文字（跳动文字）整体样式 | _StyleType_ | `{ 'font-size': 100 }` |
| tipsWords | 提示文字（跳动文字） | _string_ | `领福利啦～` |
| handStyle | 手势样式 | _StyleType_ | `{ width: 160, height: 170 }` |
| handImg | 手势图片 | _string_ | `//yun.tuisnake.com/tact/turnCircle/bcb4fc7e-18c1-46d7-bdae-2e91147196c1.png` |

## Slots
| 名称 | 作用域 | 说明 |
| --- | --- | --- |
| result | 无 | 奖品内容替换 |
| tips | 无 | 提示信息替换 |

## Events
| 名称 | 参数 | 说明 |
| --- | --- | --- |
| clickStart | _Promise_ | 第一次手动刮的时候触发，可以通过等待返回的Promise来监听刮卡结束 |

## Methods
因为其为`不可控组件`，故不提供`stop`方法，当然支持其他[基础玩法组件](../../guide/basic-rule)的方法
| 名称 | 入参 | 出参 | 说明 |
| --- | --- | --- | --- |
| stop | - | - | **不提供结束方法** |
| start | 无 | _Promise_ | 开始方法，表示直接触发自动刮卡 |