## 基本使用

```javascript
import { CSSProperties, defineComponent } from 'vue'
import Cup from 'packages/cup'
import cupImage from '@/assets/cup.png'
import coinImage from '@/assets/coin.png'

export default defineComponent({
  name: 'cupDemo',

  setup() {
    const backgroundStyle: CSSProperties = {
      width: '500px',
      height: '300px',
      backgroundColor: '#1E90FF'
    }

    const cupStyle: CSSProperties = {
      width: '78px',
      height: '82px',
      backgroundImage: `url(${cupImage})`
    }

    const coinStyle: CSSProperties = {
      width: '46px',
      height: '20px',
      backgroundImage: `url(${coinImage})`
    }

    const interval = 0.5
    const times = 20

    function afterEnd(isRight:boolean) {
      console.log(isRight)
    }

    return () => (
      <>
        <Cup
          interval={interval}
          times={times}
          backgroundStyle={backgroundStyle}
          cupStyle={cupStyle}
          coinStyle={coinStyle}
          afterEnd={afterEnd}
        />
      </>
    )
  }
})
```

## Props

|  参数   | 说明  |  类型   | 默认值 |
|  ----  | ----  |  ----  | ----  |
| interval  | 换杯子的间隔 | Number  | 0.5 |
| times  | 换杯子的次数 | Number  | 20 |
| backgroundStyle  | 杯子背景区域样式 | CSSProperties  | {} 可以杯子间隔和背景 |
| cupStyle  | 杯子样式 | CSSProperties  | {} 可以设置杯子的背景图片颜色大小等 |
| coinStyle  | 硬币样式 | CSSProperties  | {} 可以设置硬币的背景图片颜色大小等 |
| options  | 转盘奖项 | Array<WheelOption>  | required |

## Events

|  事件名   | 说明  |  回调参数  | 
|  ----  | ----  |  ----  |
| afterEnd  | 猜测结果的回调 | boolean |
