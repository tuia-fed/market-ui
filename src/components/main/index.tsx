import { defineComponent } from 'vue'
import styles from './index.module.less'

export default defineComponent({
  setup(_, { slots }) {
    return () => (
      <main class={styles.main}>{(slots.default as Function)()}</main>
    )
  }
})
