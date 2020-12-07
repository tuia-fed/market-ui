import { defineComponent } from 'vue'
import Preview from '@/components/preview'
import Demo from './demo'
import Code from './README.md'

export default defineComponent({
  setup() {
    return () => (
      <>
        <Code />
        <Preview mainStyle={{ flexDirection: 'column', alignItems: 'center' }}>
          <Demo />
        </Preview>
      </>
    )
  }
})
