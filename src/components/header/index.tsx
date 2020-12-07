import { defineComponent } from 'vue'
import styles from './index.module.less'

import logo from '@/assets/logo-revert.png'
import logoText from '@/assets/logo-text-revert.png'

export default defineComponent({
  setup() {
    return () => (
      <header class={styles.header}>
        <div class={styles.left}>
          <img class={styles.brand} src={logo} alt="LOGO" />
          <img class={styles.text} src={logoText} alt="LOGO_TEXT" />
        </div>
        <div class={styles.right}>
          <a
            href="http://gitlab.dui88.com/tuia-frontend/tuia-activity-frontend/market-ui"
            target="_blank"
          >
            <img
              class={styles.logo}
              src="https://yun.tuisnake.com/mk-ui/logo/github.523d0066.svg"
            />
            Github
          </a>
        </div>
      </header>
    )
  }
})
