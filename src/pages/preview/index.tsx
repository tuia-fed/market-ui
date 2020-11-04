import { defineComponent } from 'vue'
import styles from './index.module.less'
import components from './components'

export default defineComponent({
  name: 'Preview',

  setup() {
    return () => (
      <div class={styles.list}>
        {components.map(({ name, render }) => (
          <div class={styles.item}>
            <div class={styles.card}>
              {render()}
              <div class={styles.name}>{name}</div>
            </div>
          </div>
        ))}
      </div>
    )
  }
})
