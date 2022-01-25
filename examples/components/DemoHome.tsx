import Vue from 'vue'
import DemoHomeNav from './DemoHomeNav'
import '../common/style/demo-home.less'
import { nav } from '../config';

export default Vue.extend({
  components: {
    DemoHomeNav
  },

  data: () => ({
    nav,
    publicPath: process.env.BASE_URL
  }),

  render() {
    return (
      <div class="demo-home">
        <h1 class="demo-home__title">
          <img src={`${this.publicPath}logo.png`} alt="" />
          <span>MarketUI</span>
        </h1>
        <h2 class="demo-home__desc">
          丰富、可靠的移动端营销互动组件库
        </h2>
        {
          this.nav.length && this.nav.map(item => {
            return (
              <demo-home-nav key={item.title} nav={item} />
            )
          })
        }
      </div>
    )
  }
})
