import { defineComponent } from 'vue'

export default defineComponent({
  name: 'App',

  setup() {
    return () => <router-view />
  }
})
