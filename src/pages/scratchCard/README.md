## Usage

```javascript
import { defineComponent, ref } from 'vue'
import ScratchCard from 'packages/scratchCard'

export default defineComponent({
  name: 'ScratchCardDemo',

  setup() {
    const width = 400
    const height = 300
    const layerImg = 'yun.dui88.com/tact/scratchCard/cardBg.png' // 可以不提供图片，有默认的卡颜色
    const autoPlay = ref(true) // 是否开启自动刮
    const targetRate = '' // 不提供刮掉面积占比的时候，有一个默认值，刮掉面积达到时进行开奖
    let isPlaying = false // 是否正在刮过程中
    const autoPoints: Array<Array<number>> = []

    const touchStartAct = () => {
      // 开始刮的时候，要做的事情，比如隐藏引导手势
      isPlaying = true
      console.log('开始刮了')
    }

    const touchEndAct = () => {
      // 刮结束了开奖之后的动作
      isPlaying = false
      console.log('结束刮卡')
    }

    return () => (
      <>
        <div class="card_bg_img"></div>
        <ScratchCard
          width={width}
          height={height}
          layerImg={layerImg}
          autoPlay={autoPlay.value}
          targetRate={targetRate}
          touchStartAct={touchStartAct}
          touchEndAct={touchEndAct}
          isPlaying={isPlaying}
          autoPoints={autoPoints}
        />
        <div class="guide_hand"></div>
      </>
    )
  }
})
```

## Props

|  参数   | 说明  |  类型   | 默认值 |
|  ----  | ----  |  ----  | ----  |
| width  | 画布宽度 | Number  | 0 |
| height  | 画布高度 | Number  | 0 |
| paintCoat  |  渲染在画布上的涂层 | string  | ''，可以是图片地址或者颜色值，有提过默认颜色值 |
| autoPlay  | 是否支持自动刮开 | Boolean  | true |
| targetRate  | 刮开的比例目标 | Number  | 0 |
| autoPoints  | 自动刮的坐标点 | Array<Array<number>>  | []，有提供默认自动刮开的点 |


## Events

|  事件名   | 说明  |  回调参数  |
|  ----  | ----  |  ----  |
| touchStartAct  | 开始刮的时候需要做的事 | 事件对象 e: Event , 奖项下标 i: Number |
| touchEndAct  | 结束的时候需要做的事 | 事件对象 e: Event , 奖项下标 i: Number |
