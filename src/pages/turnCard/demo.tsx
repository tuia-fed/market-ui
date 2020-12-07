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
