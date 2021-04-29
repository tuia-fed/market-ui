import Vue, { PropType } from 'vue'
import ArrowRight from './ArrowRight'
import '../common/style/demo-home-nav.less'
import { groupItemType } from './DemoHome'

export default Vue.extend({
  components: {
    ArrowRight
  },

  props: {
    group: {
      type: Object as PropType<groupItemType>
    }
  },

  methods: {
    handlePushRoute (path: string) {
      // 向主窗口发送路由消息
      window.parent.postMessage({ path }, '*')
    },
    groupTitle(val: string) {
      const titleExp = new RegExp(/\|/, 'g')
      if (titleExp.test(val)) {
        return val.split('|')[1].trim()
      }
      return val
    },
    filterPath(path: string) {
      let componentPath: string = path
      if (/^\/components/.test(path)) {
        componentPath = path.split('/components')[1]
      }
      return componentPath
    }
  },

  render() {
    return (
      <div class="demo-home-nav">
        <div>
          <div class="demo-home-nav__title">
            { this.group.group }
          </div>
          <div class="demo-home-nav__group">
            {
              this.group.children.map((navItem: { path: string; title: string }) => {
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
