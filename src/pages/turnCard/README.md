## 基本使用

```javascript
import { CSSProperties, defineComponent, ref } from 'vue'
import TurnCard from 'packages/turnCard'
import cardImage from '@/assets/cardImage.png'
import cardBackImage from '@/assets/cardBackImage.png'
import itemImage from '@/assets/smile.png'
import logo from '@/assets/logo.png'
import './index.less'

const length = 12
const options = ref(
  Array.from({ length })
    .map((_, index) => index)
    .map(item => ({
      cardImg: cardImage,
      backImg: cardBackImage,
      itemImg: itemImage,
      turn: false
    }))
)
export default defineComponent({
  name: 'TurnCardDemo',

  setup() {
    const width = ref(100 * 0.8)
    const height = ref(144 * 0.8)
    const activeIndex = ref(0)
    setInterval(() => {
      if (activeIndex.value === length) {
        activeIndex.value = 0
        return
      }
      activeIndex.value++
    }, 1000)
    const style: CSSProperties = {
      animation: 'cardAni 1s linear infinite'
    }
    const onCardClick = (e: MouseEvent, i: number) => {
      options.value[i].turn = true
      options.value[i].itemImg = logo
    }
    const reset = () => {
      for (let i = 0; i < length; i++) {
        options.value[i].turn = false
      }
    }

    return () => (
      <div>
        <button onClick={reset}>重置</button>
        <TurnCard
          width={width.value}
          height={height.value}
          options={options.value}
          cardClick={onCardClick}
          activeIndex={activeIndex.value}
          cardAni={style}
        />
      </div>
    )
  }
})
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
| cardClick  | 每张牌点击的回调 | 事件对象 e: Event , 奖项下标 i: Number |
