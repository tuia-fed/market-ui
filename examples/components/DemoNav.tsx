import Vue from 'vue'
import '../common/style/demo-nav.less'

export default Vue.extend({
  data() {
    return {
      path:
      'M296.114 508.035c-3.22-13.597.473-28.499 11.079-39.105l333.912-333.912c16.271-16.272 42.653-16.272 58.925 0s16.272 42.654 0 58.926L395.504 498.47l304.574 304.574c16.272 16.272 16.272 42.654 0 58.926s-42.654 16.272-58.926 0L307.241 528.058a41.472 41.472 0 0 1-11.127-20.023z',
    }
  },
  computed: {
    title() {
      const { name } = this.$route.meta || {}
      return name ? name.replace(/-/g, '') : ''
    }
  },
  methods: {
    onBack() {
      if (history.length > 1) {
        history.back()
      } else {
        this.$router.replace('/')
      }
    }
  },
  render() {
    if (this.title) {
      return (
        <div class="demo-nav">
          <div class="demo-nav__title">{ this.title }</div>
          <svg class="demo-nav__back" viewBox="0 0 1000 1000" onClick={this.onBack}>
            <path fill="#969799" fill-rule="evenodd" d={this.path} />
          </svg>
        </div>
      )
    }
    return null
  }
})
