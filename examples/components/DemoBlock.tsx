import Vue from 'vue'
import '../common/style/demo-block.less'

export default Vue.extend({
  name: 'DemoBlock',

  props: {
    card: Boolean,
    title: String,
  },

  render () {
    return (
      <div class="doc-demo-block">
        {
          this.title ? <div class="doc-demo-block__title">{ this.title }</div> : null
        }
        {
          this.card ? <div class="doc-demo-block__card">{ this.$slots.default }</div> : <div>{ this.$slots.default  }</div>
        }
      </div>
    )
  }
})
