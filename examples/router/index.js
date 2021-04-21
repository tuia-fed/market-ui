import Vue from 'vue'
import VueRouter from 'vue-router'

/* require.context——用于获取模块的上下文,导出的是一个require函数,导出的函数包含3个属性——resolve,keys,id */
const demoFiles = require.context('../../src', true, /index\.vue$/)

const ROUTE_NAME_REG = /\.\/(\w+)\/demo\/index.vue/

const homeRoutes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('../components/DemoHome')
  }
]

const routes = demoFiles.keys().map(name => {
  const match = name.match(ROUTE_NAME_REG)

  if (match) {
    name = match[1]
  }

  return {
    path: `/${name}`,
    name,
    component: () => import(`../../src/${name}/demo`),
    meta: {
      name
    }
  }

})

const combineRoutes = [
  ...routes,
  ...homeRoutes
]
// 全局调用VueRouter插件
Vue.use(VueRouter)

export const router = new VueRouter({
  mode: 'hash',
  routes: combineRoutes,
  scrollBehavior: (to, from, savedPosition) => savedPosition || { x: 0, y: 0 },
})
