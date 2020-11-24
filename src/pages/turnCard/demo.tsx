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
