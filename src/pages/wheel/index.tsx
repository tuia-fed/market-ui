import { defineComponent } from 'vue'
import Demo from './demo'
import Code from './README.md'

export default defineComponent({
  setup() {
    return () => (
      <>
        <Demo />
        <Code />
      </>
    )
  }
})
