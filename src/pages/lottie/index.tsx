import { defineComponent } from 'vue';
import Lottie from 'packages/lottie'
import loveJson from '@/assets/love.json'

export default defineComponent({
  name: 'Lottie',

  setup() {
    return () => <Lottie data={loveJson} />
  }
})