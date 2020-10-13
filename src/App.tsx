import { defineComponent } from 'vue'
import WheelDemo from '@/components/wheel/demo'

export default defineComponent({
  name: 'App',

  setup() {
    return () => (
      <WheelDemo />
    )
  }
})
