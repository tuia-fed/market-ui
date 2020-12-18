import { defineComponent, ref, computed } from 'vue'
import { RouterLink } from 'vue-router'
import routes from '../../router/routes'
import styles from './index.module.less'

export default defineComponent({
  setup() {
    const opend = ref(false)
    const navClass = computed(() => {
      if (opend.value) {
        return styles.nav + ' ' + styles.show
      }

      return styles.nav
    })

    const onClick = () => {
      opend.value = !opend.value
    }

    return () => (
      <div class={styles.bar}>
        <div class={styles.btn} onClick={onClick}>
          <span></span>
        </div>
        <nav class={navClass.value}>
          {routes.map(({ children, name }) => (
            <div class={styles.group}>
              <div class={styles.title}>{name}</div>
              <ul>
                {children.map(({ path, name }) => (
                  <li key={name}>
                    <RouterLink to={path} activeClass={styles.activeClass}>
                      {name}
                    </RouterLink>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </nav>
      </div>
    )
  }
})
