---
group: 互动组件
level: 1
---

# 九宫格

最古老的抽奖玩法之一，一般是AxA方形九宫格的形式。用户点击之后，有一个蒙层开始沿着奖品链路依次选中奖品，并最终停留在某个奖品上。

## 引入

```js
import Vue from 'vue'
import { Sudoku } from '@tuia/market-ui'

Vue.use(Sudoku)
```

## 代码演示

<<< @/src/Sudoku/demo/index.vue#html

<br />

<details>

<summary>点击展开完整代码</summary>

<<< @/src/Sudoku/demo/index.vue#js

</details>

# API

```typescript
// 单个奖项的类型
type OptionType = {
  image: string
  index: number
}
```

## Sudoku Props

| 参数 | 说明 | 类型 | 是否是必须参数 | 默认值 |
| --- | --- | --- | --- | --- |
| activeIndex | 当前高亮的选项索引 | _number_ | 是 | 无 |
| options | 奖品选项列表, Array<`OptionType`> | _array_ | 是 | 无 |
| rowsAmount | 容器单行的奖品个数 | _number_ | 否 | 3 |
| radius | 容器边长 | _number_ | 否 | 300 |
| containerStyle | 容器的样式 | _object_ | 否 | 无 |

## Sudoku Events
| 名称 | 说明 |
| --- | --- |
| itemClick | 奖品点击事件, (index) => void, 返回参数是当前奖品的索引 |
