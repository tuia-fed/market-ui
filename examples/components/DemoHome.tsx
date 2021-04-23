import Vue from 'vue'
import DemoHomeNav from './DemoHomeNav'
import '../common/style/demo-home.less'

export default Vue.extend({
  components: {
    DemoHomeNav
  },

  data: () => ({
    group: []
  }),

  mounted() {
    const groups = this.$router.options.routes
    // 过滤首页
    this.group = groups.filter((item: { path: string }) => item.path !== '/')
  },

  render() {
    return (
      <div class="demo-home">
        <h1 class="demo-home__title">
          <img src="//yun.dui88.com/h5-mani/marketuibed47dbb-c6aa-4b7d-ab79-d281e0805c0f.png" alt="" />
          <span>MarketUI</span>
        </h1>
        <h2 class="demo-home__desc">
          轻量、可靠的移动端组件库
        </h2>
        <demo-home-nav group={this.group} />
      </div>
    )
  }
})
