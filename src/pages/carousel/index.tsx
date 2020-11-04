import { CSSProperties, defineComponent, ref } from 'vue'
import Carousel from 'packages/carousel'

export default defineComponent({
  name: 'Carousel',

  setup() {
    const onStart = (e: MouseEvent) => {
      console.log('onStart', e)
    }

    const cardNum = ref(6)

    const radius = ref(270)

    const cardStyles: CSSProperties = {
      top: '170px',
      width: '307px',
      height: '361px',
      backgroundImage: `url('//yun.tuisnake.com/tact/RedPackSurrounded/fda523e8764bd6fdcd44431b8b34e220.png')`
    }

    return () => (
      <Carousel
        onStart={onStart}
        cardNum={cardNum.value}
        cardStyle={cardStyles}
        radius={radius.value}
      ></Carousel>
    )
  }
})
