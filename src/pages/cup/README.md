## 基本使用

```javascript
import { CSSProperties, defineComponent } from 'vue'
import Cup from 'packages/cup'
import cupImage from '@/assets/cup.png'
import coinImage from '@/assets/coin.png'

export default defineComponent({
  name: 'cupDemo',

  setup() {
    const [list, direction, cupNumber, interval, t] = Cup.useTurn()

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

    const times = 10

    function start() {
      t.start(0.1, times)
    }

    function cupClick(index: number, isIndex: boolean) {
      t.cupUp(index)
      if (isIndex) {
        setTimeout(() => {
          alert('猜对了')
        }, 1000)
      }
    }

    const btnStyle: CSSProperties = {
      width: '100px',
      height: '60px',
      margin: 'auto',
      position: 'absolute',
      left: '50%',
      marginTop: '40px',
      transform: 'translateX(-50%)'
    }

    return () => (
      <>
        <div>
          <Cup
            backgroundStyle={backgroundStyle}
            cupStyle={cupStyle}
            coinStyle={coinStyle}
            list={list.value}
            direction={direction.value}
            interval={interval.value}
            cupNumber={cupNumber.value}
            cupClick={cupClick}
          />
          <button style={btnStyle} onClick={start}>开始</button>
        </div>
      </>
    )
  }
})
```

## Hooks

```javascript
import { Cup } from 'market-ui'

const [list, direction, cupNumber, interval, turn] = Wheel.useRotate()

/**
 * 开始游戏
 *
 * @param Number interval 换杯子的间隔
 * @param Number times 换杯子的次数
 */
turn.start(interval, times)

/**
 * 杯子升起
 * @param Number index 传入杯子索引
 */
turn.cupUp(index)
```

## Props

|  参数   | 说明  |  类型   | 默认值 |
|  ----  | ----  |  ----  | ----  |
| interval  | 换杯子的间隔 | Number  | 0.5 |
| times  | 换杯子的次数 | Number  | 20 |
| backgroundStyle  | 杯子背景区域样式 | CSSProperties  | {} 可以杯子间隔和背景 |
| cupStyle  | 杯子样式 | CSSProperties  | {} 可以设置杯子的背景图片颜色大小等 |
| coinStyle  | 硬币样式 | CSSProperties  | {} 可以设置硬币的背景图片颜色大小等 |

## Events

|  事件名   | 说明  |  回调参数  | 
|  ----  | ----  |  ----  |
| cupClick  | 杯子点击事件 | boolean |
