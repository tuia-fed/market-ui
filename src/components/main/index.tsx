import { defineComponent } from 'vue'
import styles from './index.module.less'

export default defineComponent({
  name: 'Main',

  setup(_, { slots }) {
    return () => (
      <main class={styles.main}>{(slots.default as Function)()}</main>
    )
  }
})
