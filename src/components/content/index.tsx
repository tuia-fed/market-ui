import { defineComponent } from 'vue'
import styles from './index.module.less'

export default defineComponent({
  setup(_, { slots }) {
    return () => (
      <section class={styles.content}>{(slots.default as Function)()}</section>
    )
  }
})
