# 3D转盘

3D转盘是[大转盘](../Wheel)的**变体**（变体的详细说明可以查看[变体与预设](../../guide/presets)），但是只是复用了转盘的逻辑。其为`可控组件`（详细说明可查看[基础玩法组件逻辑规范](../../guide/basic-rule)）

另外，该转盘**尚未标准化**

## 按需引入

```js
import Vue from 'vue'
import Wheel3D from '@tuia/market-ui/lib/Wheel3D'
import '@tuia/market-ui/lib/Wheel3D/style'

Vue.use(Wheel3D)
```

## 代码演示

<<< @/src/Wheel3D/demo/index.vue#html

<details>

<summary>点击展开完整代码</summary>

<<< @/src/Wheel3D/demo/index.vue#js

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
| containerStyle | 底盘样式（包含整体位置） | _StyleType_ | `{ width: 750, height: 465 }` |
| perspective | 透视距离 | _number_ | `1500` |
| itemStyle | 奖项样式 | _StyleType_ | `{ width: 252, height: 360 }` |
| itemBgImg | 奖项背景图片 | _string_ | `//yun.tuisnake.com/market-ui/02b27f2f-b476-495e-b812-188981cf6261.png` |
| prizeImgStyle | 奖品图片样式 | _StyleType_ | `{ width: 180, height: 180, top: 90 }` |
| prizeTextStyle | 奖品标题样式 | _StyleType_ | `{ width: 180, height: 50, 'line-height': 50, top: 8, 'font-size': 24 }` |
| prizeList | 奖品列表（当前仅支持8个） | _PrizeType[]_ | `[...]` |
| wheelRadius | 转盘半价 | _number_ | `24` |
| idleTurningSpeed | 转盘闲置每秒转动度数（闲置转速） | _number_ | `250` |
| maxTurningSpeed | 转盘运行每秒转动度数（最大转速） | _number_ | `900` |

## Events
| 名称 | 参数 | 说明 |
| --- | --- | --- |
| prizeClick | _PrizeInfoType_ | 奖品被点击时触发 |

## Methods
对于[基础玩法组件](../../guide/basic-rule)的`stop`方法入参做了限定，来确定命中目标
| 名称 | 入参 | 出参 | 说明 |
| --- | --- | --- | --- |
| stop | _WheelStopOptionType_ | _Promise_ | 结束方法 |