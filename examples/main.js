/* eslint-disable */
import Vue from 'vue'
import App from './App'
import { router } from './router'
import MarketUI from '@tuia/market-ui'
import '@tuia/market-ui/index.less'
import DemoBlock from './components/DemoBlock'
import DemoSection from './components/DemoSection'
import { delay } from './utils'
Vue.prototype.$delay = delay
/* 全局注册组件库 */
Vue.use(MarketUI)

Vue.component('DemoBlock', DemoBlock)
Vue.component('DemoSection', DemoSection)

if (process.env.NODE_ENV !== 'production') {
  Vue.config.productionTip = false
}

new Vue({
  render: h => h(App),
  router
}).$mount('#app')
