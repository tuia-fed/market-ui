# 翻牌子
排成方形的卡牌阵型，用户点击卡牌，卡牌进行翻转动画后，触发后续的中奖回调。

## 引入

```js
import Vue from 'vue'
import { TurnCard } from '@tuia/market-ui'

Vue.use(TurnCard)
```

## 代码演示

<<< @/src/TurnCard/demo/index.vue#html

<br />

<details>

<summary>点击展开完整代码</summary>

<<< @/src/TurnCard/demo/index.vue#js

</details>

# API

```typescript
type CardOption = {
  /** 卡牌正面背景图 */
  front: string;
  /** 卡牌背面背景图 */
  back: string;
}

enum State = {
  // 卡牌初始化正面状态
  FRONT = 1,
  // 翻转过渡态
  TRANSITION,
  // 翻转后状态
  BACK
}
```

## Props
| 参数 | 说明 | 类型 | 是否是必须参数 | 默认值 |
| --- | --- | --- | --- | --- |
| cards | 传入的卡牌正反面背景图配置项数组, `CardOption` | _array_ | 是 | 无 |
| cardstate | 对应卡牌的翻转状态, `Array<State.FRONT>` | _array_ | 是 | 无 |
| rowsAmount | 翻牌子区域一行分布的卡牌数目 | _number_ | 否 | `3` |
| isShuffle | 是否需要开启初始化的洗牌动画, 默认开启 | _boolean_ | 否 | `true` |

# Events
| 名称 | 说明 |
| --- | --- |
| cardStart | 卡牌点击事件, `(index) => void`, 返回参数为当前的牌子索引 |

# Slots
| 名称 | 说明 |
| --- | --- |
| default | 单张卡牌的自定义渲染内容(一般用于增加引导手势的渲染) |
