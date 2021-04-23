import Vue from 'vue'
import ArrowRight from './ArrowRight'
import '../common/style/demo-home-nav.less'

export default Vue.extend({
  components: {
    ArrowRight
  },

  props: {
    group: Array,
  },

  render() {
    return (
      <div class="demo-home-nav">
        <div class="demo-home-nav__group">
          {
            this.group.map((navItem: { path: string; name: string }) => {
              return (
                <router-link class="demo-home-nav__block" key={navItem.path} to={navItem.path}>
                  { navItem.name }
                  <arrow-right class="demo-home-nav__icon" />
                </router-link>
              )
            })
          }
        </div>
      </div>
    )
  }
})
