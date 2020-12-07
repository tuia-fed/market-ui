import { defineComponent } from 'vue'
import Markdown from './README.md'

export default defineComponent({
  setup() {
    return () => <Markdown />
  }
})
