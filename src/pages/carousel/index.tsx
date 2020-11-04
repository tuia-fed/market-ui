import { defineComponent, ref } from 'vue'
import Carousel from 'packages/carousel'

export default defineComponent({
  name: 'Carousel',

  setup() {
    const onStart = (e: MouseEvent) => {
      console.log('onStart', e)
    }

    const cardNum = ref(6)

    return () => <Carousel onStart={onStart} cardNum={cardNum.value}></Carousel>
  }
})
