---
group: 互动组件
level: 2
---

# 基座大转盘

用于做简单消息提示的组件，支持全局插件调用

## 引入
```js
import Vue from 'vue'
import { WheelFoundation } from '@tuia/market-ui'

Vue.use(WheelFoundation)
```

## 代码演示

```html
<mk-wheel-foundation
  ref="wheel"
  :prizeList="prizeList"
  @stateChange="stateChange"
  @clickStart="clickStart"
  @prizeClick="prizeClick"
/>
```

<details>

<summary>点击展开完整代码</summary>

<<< @/src/WheelFoundation/demo/index.vue#js

</details>

# API

## Props
| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| msg | 轻提示文案 | _string_ | 无 |
| duration | 持续时间 | _numer_ | 2500 |
| position | 位置，可选值为`top` `middle` `bottom` | _string_ | `center` |
| color | 文案字体颜色 | _string_ | `#fff` |
| bg | 背景颜色 | _string_ | `rgba(0, 0, 0, 0.6)` |

## Events
| 事件名 | 说明 | 回调参数 |
| --- | --- | --- |
| show | 打开轻提示 | - |
| hide | 关闭轻提示 | - |
