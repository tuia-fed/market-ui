---
group: 基础组件
level: 1
---

# 帧动画播放

用于快速生成元素的帧动画播放效果

## 引入

```js
import Vue from 'vue'
import { FramesPlayer } from '@tuia/market-ui'

Vue.use(FramesPlayer)
```

## 代码演示

<<< @/src/FramesPlayer/demo/index.vue#html

<br />

<details>

<summary>点击展开完整代码</summary>

<<< @/src/FramesPlayer/demo/index.vue#js

</details>

# API

## FramesPlayer Props
| 参数 | 说明 | 类型 | 默认值 | 是否是必须参数 |
| --- | --- | --- | --- | --- |
| url | 序列帧图片的cdn链接 | _string_ | 无 | 是 |
| amount | 序列帧的总帧数 | _number_ | 无 | 是 |
| rows | 序列帧的行数 | _number_ | 无 | 是 |
| columns | 序列帧的列数 | _number_ | 无 | 是 |
| duration | 帧动画播放时长(ms) | _number_ | 1000 | 是 |
| direction | 帧动画播放顺序('normal', 'reverse') | _string_ | 'normal' | 否
| times | 帧动画播放次数 | _number_ | `1` | 否 |

## FramesPlayer Events
| 名称 | 说明 |
| --- | --- |
| playEnd | 帧动画播放结束的回调事件 |
