import { provide, SetupContext } from 'vue'
import { createComponent } from './create'

export default createComponent({
  setup(_, ctx) {
    provide<SetupContext>('app', ctx)
  }
})