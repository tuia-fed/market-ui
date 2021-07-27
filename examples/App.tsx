import Vue from 'vue'
import DemoNav from './components/DemoNav'
import './common/style/base.less'

export default Vue.extend({
  components: {
    DemoNav
  },

  render() {
    return (
      <div>
        <DemoNav />
        <router-view />
      </div>
    )
  }
})
