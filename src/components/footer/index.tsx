import { defineComponent } from 'vue'
import styles from './index.module.less'

export default defineComponent({
  setup() {
    return () => <div class={styles.footer}>©️ 2020 推啊FED</div>
  }
})
