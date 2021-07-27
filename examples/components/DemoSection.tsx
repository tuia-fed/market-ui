import Vue from 'vue'
import '../common/style/demo-section.less'

export default Vue.extend({
  name: 'DemoSection',

  render () {
    return (
      <section class="doc-demo-section">
        { this.$slots.default }
      </section>
    )
  }
})
