import { defineComponent } from 'vue'
import styles from './index.module.less'

export default defineComponent({
  name: 'Content',

  setup(_, { slots }) {
    return () => (
      <section class={styles.content}>{(slots.default as Function)()}</section>
    )
  }
})
