# Wheel 大转盘

::: slot demo
<ClientOnly>
  <demo-wheel/>
</ClientOnly>
:::

## 介绍
* 一个圆形的转盘，按照一定的速率转动停下之后，指针指向的位置就是抽中的奖品

## 引入
```js
import Vue from 'vue'
import { Wheel } from '@tuia/market-ui'

Vue.use(wheel)
```

# 代码演示

## 基础用法
* 
```js
import { useRotate } from '@tuia/market-ui/wheel'

export default {
  data() {
    return {
      angle: 0
    }
  },

  mounted() {
    this.hooks = useRotate(angle => {
      this.angle = angle
    })
    this.hooks.idled()
  },

  methods: {
    async onStart() {
      this.hooks.start()
      await this.delay(3000)
      this.hooks.to({
        index: 3,
        complete() {
          Toast.show('中奖啦')
        }
      })
    },
    delay(time) {
      return new Promise(resolve => {
        setTimeout(resolve, time)
      })
    }
  }
}
```

# API

## Props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| angle | 角度，转盘转动的角度 | _number_ | `0` |
| size | 尺寸， 圆形转盘的尺寸 | _number_ | `300` |

## Slots
| 名称 | 说明 |
| --- | --- |
| default | 转盘内的奖品分布 |
