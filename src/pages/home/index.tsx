import { defineComponent } from 'vue'
import { RouterLink } from 'vue-router'

export default defineComponent({
  name: 'Home',

  setup() {
    return () => (
      <ul>
        <li>
          <RouterLink to={'/'}>首页</RouterLink>
        </li>
        <li>
          <RouterLink to={'/wheel'}>大转盘</RouterLink>
        </li>
        <li>
          <RouterLink to={'/lottie'}>lottie</RouterLink>
        </li>
      </ul>
    )
  }
})
