import { defineComponent } from 'vue'
import Carousel from 'packages/carousel'

export default defineComponent({
  name: 'Carousel',

  setup() {
    const onStart = (e: MouseEvent) => {
      console.log('onStart')
    }

    return () => {
      ;<Carousel></Carousel>
    }
  }
})
