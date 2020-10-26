import { defineComponent } from 'vue'
import { RouterLink } from 'vue-router'
import routes from '../../router/routes'
import styles from './index.module.less'

export default defineComponent({
  name: 'NavBar',

  setup() {
    return () => (
      <nav class={styles.nav}>
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
    )
  }
})
