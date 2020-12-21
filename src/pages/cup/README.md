## Usage

```javascript
import { CSSProperties, defineComponent } from 'vue'
import Cup from 'packages/cup'
import cupImage from '@/assets/cup.png'
import coinImage from '@/assets/coin.png'
import startBtn from '@/assets/start_btn.png'

export default defineComponent({
  name: 'cupDemo',

  setup() {
    const [list, direction, cupNumber, interval, turn] = Cup.useTurn()

    const backgroundStyle: CSSProperties = {
      width: '100%',
      height: '300px',
      backgroundImage: 'url(//yun.duiba.com.cn/duiba-live/welfareRainV2/rain_bg.png)',
      backgroundSize: '100% auto'
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

    function start() {
      turn.start(0.1, 10)
    }

    function onCupClick(index: number, isIndex: boolean) {
      turn.cupUp(index).then(() => {
        if (isIndex) {
          alert('猜对了')
          turn.reset()
        } else {
          alert('猜错了')
          turn.reset()
        }
      })
    }

    const btnStyle: CSSProperties = {
      width: '204px',
      height: '55px',
      margin: 'auto',
      position: 'absolute',
      left: '50%',
      transform: 'translate(-50%, -80px)',
      backgroundImage: `url(${startBtn})`,
      backgroundSize: '100% 100%'
    }

    const mainStyle: CSSProperties = {
      width: '100vw'
    }

    return () => (
      <>
        <div style={mainStyle}>
          <Cup
            backgroundStyle={backgroundStyle}
            cupStyle={cupStyle}
            coinStyle={coinStyle}
            list={list.value}
            direction={direction.value}
            interval={interval.value}
            cupNumber={cupNumber.value}
            onCupClick={onCupClick}
          />
          <div style={btnStyle} onClick={start}></div>
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


/**
 * 游戏重置
 */
turn.reset()

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
| onCupClick  | 杯子点击事件回调 | function (index: number, isIndex: boolean) {} 返回当前点击的杯子的索引值，和硬币是否在当前杯子的boolean|
