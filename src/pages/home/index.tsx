import { defineComponent } from 'vue'
import Markdown from './README.md'

import './index.less'

export default defineComponent({
  setup() {
    return () => <Markdown />
  }
})
