## 基本使用

```javascript
import { CSSProperties, defineComponent, ref } from 'vue'
import TurnCard from 'packages/turnCard'
import cardImage from '@/assets/cardImage.png'
import cardBackImage from '@/assets/cardBackImage.png'
import itemImage from '@/assets/smile.png'
import './index.less'

const length = 6
const data = Array.from({ length })
  .map((_, index) => index)
  .map(() => ({
    cardImg: cardImage,
    backImg: cardBackImage,
    itemImg: itemImage,
    turn: false
  }))

export default defineComponent({
  name: 'TurnCardDemo',

  setup() {
    const width = ref(100 * 0.8)
    const height = ref(144 * 0.8)
    const [activeIndex, options, game] = TurnCard.useAnimation(0, data)

    game.start()

    const onCardClick = (e: MouseEvent, i: number) => {
      game.turnBack(i)
    }

    const reset = () => {
      game.reset()
    }

    const container: CSSProperties = {
      display: 'flex',
      flexDirection: 'column',
      width: '90%',
      position: 'absolute',
      left: '50%',
      transform: 'translate(-50%)'
    }

    return () => (
      <div style={container}>
        <TurnCard
          width={width.value}
          height={height.value}
          options={options.value}
          onCardClick={onCardClick}
          activeIndex={activeIndex.value}
          activeClassName={'turncard_demo_active'}
        />
        <button onClick={reset}>重置</button>
      </div>
    )
  }
})
```

## Hooks

```javascript
import { TurnCard } from 'market-ui'

const [activeIndex, options, game] = TurnCard.useAnimation(0, data)

// activeIndex 作为卡牌动画的下标，是一个 Ref

// 卡牌开始动画
game.start()
// 翻转下标i的卡牌
game.turnBack(i)
// 卡牌重置
game.reset()
```

## Props

|  参数   | 说明  |  类型   | 默认值 |
|  ----  | ----  |  ----  | ----  |
| width  | 卡牌宽度 | Number  | 0 |
| height  | 卡牌高度 | Number  | 0 |
| options  | 卡牌项 | Array<CardOption>  | {} 可以设置卡牌正反面图片、反面item图、翻转 |
| activeIndex  | 卡牌动效下标 | Number  | -1 可以通过改变activeIndex决定哪张牌做动效 |
| cardAni  | 动效 | PropType<CSSProperties>  | {} 卡牌要做的动效 |

## Events

|  事件名   | 说明  |  回调参数  | 
|  ----  | ----  |  ----  |
| onCardClick  | 每张牌点击的回调 | 事件对象 e: Event , 奖项下标 i: Number |
