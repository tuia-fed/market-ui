import { CSSProperties, defineComponent, ref } from 'vue'
import TurnCard from 'packages/turnCard'
import cardImage from '@/assets/cardImage.png'
import cardBackImage from '@/assets/cardBackImage.png'
const options = Array.from({ length: 6 })
  .map((_, index) => index)
  .map(item => ({
    cardImg: cardImage,
    backImg: cardBackImage
  }))
console.log(options)
export default defineComponent({
  name: 'TurnCardDemo',

  setup() {
    const width = ref(100)
    const height = ref(144)
    const onCardClick = (e: MouseEvent, i: number) => {
      console.log(i)
    }

    return () => (
      <TurnCard
        width={width.value}
        height={height.value}
        options={options}
        cardClick={onCardClick}
        activeIndex={1}
      />
    )
  }
})
