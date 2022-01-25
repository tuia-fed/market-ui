# 红包雨

从容器上方随机降落不同种类的红包，用户点击红包，触发红包拆开回调事件。

## 引入

```js
import Vue from 'vue'
import { GiftRain } from '@tuia/market-ui'

Vue.use(GiftRain)
```

## 代码演示

<<< @/src/GiftRain/demo/index.vue#html

<br />

<details>

<summary>点击展开完整代码</summary>

<<< @/src/GiftRain/demo/index.vue#js

</details>

# API

```typescript
type ImageSourceType = Array<string>

type GiftOpenFrameType = {
  // 帧动画图片的资源地址
  url: string
  // 帧动画的帧数,静态图片则默认是一帧
  amount: number
}
```

## Props
| 参数 | 说明 | 类型 | 是否是必须参数 | 默认值 |
| --- | --- | --- | --- | --- |
| imgSource | 用于渲染成红包雨图片的资源列表, `ImageSourceType` | _array_ | 是 | 无 |
| giftOpenFrame | 用于渲染成红包打开之后爆炸的帧动画图片资源信息, `GiftOpenFrameType` | _object_ | 是 | 无 |

## Events
| 名称 | 说明 |
| --- | --- |
| openGift | 红包拆开事件, `(amount) => void`, 返回参数是总共拆开的红包个数 |

## 方法
* 通过`ref`可以获取到`GiftRain`实例并调用实例方法

| 方法名 | 说明 |
| --- | --- |
| start | 用于开启红包雨 |
| stop | 用于停止红包雨 |
