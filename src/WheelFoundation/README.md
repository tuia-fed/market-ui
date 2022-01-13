---
group: 基础玩法组件
level: 2
---

# 基座大转盘

待补充

## 按需引入

```js
import Vue from 'vue'
import WheelFoundation from '@tuia/market-ui/lib/WheelFoundation'
import '@tuia/market-ui/lib/WheelFoundation/style'
// 这里需要将大转盘的样式也引入，因为其直接使用大转盘来生效
import '@tuia/market-ui/lib/Wheel/style'

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


