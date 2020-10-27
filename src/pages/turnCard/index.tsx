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

    const onStart = () => {
      if (turn.value) return
      turn.value = true
    }

    return () => (
      <TurnCard
        width={width.value}
        height={height.value}
        backWidth={width.value}
        backHeight={height.value}
        turn={turn.value}
        cardStyle={CardStyle}
        cardBackStyle={CardBackStyle}
        onStart={onStart}
        // onStart={onStart}
      />
    )
  }
})
