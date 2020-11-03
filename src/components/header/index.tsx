import { defineComponent } from 'vue'
import styles from './index.module.less'

export default defineComponent({
  setup() {
    return () => (
      <header class={styles.header}>
        <div class={styles.left}>
          <img
            class={styles.brand}
            src="https://yun.tuia.cn/tuia/tuia-advert-home-node/dist/8002c0da0e204d0717b18dc2136a87c4.png"
            alt="LOGO"
          />
        </div>
        <div class={styles.right}>
          <a
            href="http://gitlab.dui88.com/tuia-frontend/tuia-activity-frontend/market-ui"
            target="_blank"
          >
            Github
          </a>
        </div>
      </header>
    )
  }
})
