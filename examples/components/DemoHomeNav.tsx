import Vue, { PropType } from 'vue'
import ArrowRight from './ArrowRight'
import '../common/style/demo-home-nav.less'
import { NavItemType } from '../config';

export default Vue.extend({
  components: {
    ArrowRight
  },

  props: {
    nav: {
      type: Object as PropType<NavItemType>
    }
  },

  methods: {
    handlePushRoute (path: string) {
      // 向主窗口发送路由消息
      window.parent.postMessage({ path: '/' + path }, '*')
    },
    filterPath(path: string) {
      let componentPath: string = path
      if (/components/.test(path)) {
        componentPath = path.split('components')[1]
      }
      return componentPath
    }
  },

  render() {
    return (
      <div class="demo-home-nav">
        <div>
          <div class="demo-home-nav__title">
            { this.nav.title }
          </div>
          <div class="demo-home-nav__group">
            {
              this.nav.items.map((navItem: { path: string; title: string }) => {
                return (
                  <div onClick={() => this.handlePushRoute(navItem.path)}>
                    <router-link class="demo-home-nav__block" key={navItem.path} to={this.filterPath(navItem.path)}>
                      { navItem.title }
                      <arrow-right class="demo-home-nav__icon" />
                    </router-link>
                  </div>
                )
              })
            }
          </div>
        </div>
      </div>
    )
  }
})
