import { CSSProperties, defineComponent, ref } from 'vue'
import TurnCard from 'packages/turnCard'
import cardImage from '@/assets/cardImage.png'
import cardBackImage from '@/assets/cardBackImage.png'

export default defineComponent({
  name: 'TurnCardDemo',

  setup() {
    const CardStyle: CSSProperties = {
      backgroundImage: `url(${cardImage})`
    }

    const CardBackStyle: CSSProperties = {
      backgroundImage: `url(${cardBackImage})`
    }

    const width = ref(100)
    const height = ref(144)
    const turn = ref(false)

    const onClick = () => {
      turn.value = false
    }

    return () => (
      <>
        <button onClick={onClick}>重置</button>
        <TurnCard
          width={width.value}
          height={height.value}
          turn={turn.value}
          cardStyle={CardStyle}
          cardBackStyle={CardBackStyle}
          // onStart={onStart}
        />
      </>
    )
  }
})
