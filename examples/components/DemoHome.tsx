import Vue from 'vue'
import DemoHomeNav from './DemoHomeNav'
import '../common/style/demo-home.less'
import RouterConfig from '../router'

type itemType = {
  path: string
  title: string
  frontmatter?: object
  headers?: []
  key?: string
  regularPath?: string
  relativePath?: string
}

export interface groupItemType {
  group: string
  children: Array<itemType>
}

export default Vue.extend({
  components: {
    DemoHomeNav
  },

  data: () => ({
    group: [],
    publicPath: process.env.BASE_URL
  }),

  mounted() {
    this.group = RouterConfig
  },

  render() {
    return (
      <div class="demo-home">
        <h1 class="demo-home__title">
          <img src={`${this.publicPath}logo.png`} alt="" />
          <span>MarketUI</span>
        </h1>
        <h2 class="demo-home__desc">
          丰富、可靠的移动端组件库
        </h2>
        {
          this.group.length && this.group.map((item: groupItemType) => {
            return (
              <demo-home-nav key={item.group} group={item} />
            )
          })
        }
      </div>
    )
  }
})
