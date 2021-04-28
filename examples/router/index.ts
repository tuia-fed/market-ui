import Vue from 'vue'
import VueRouter from 'vue-router'

/* require.context——用于获取模块的上下文,导出的是一个require函数,导出的函数包含3个属性——resolve,keys,id */
const demoFiles = require.context('../../src', true, /index\.vue$/)

/* window对象下挂载自定义对象 */
declare global {
  interface Window {
    sitebarRoutes: [];
  }
}

/* 主要由于vuepress服务先启动，再加载demo服务的iframe容器，因此demo实例挂载的时候，vuepress父窗口window的自定义对象是可以挂载成功的 */

// 判断当前demo服务是否内嵌在iframe中
const isInIframe: boolean = window !== window.top
let sitebarRoutes: Array<any>
if (isInIframe) {
  // 获取父窗口对象下挂载的组件分类对象
  const parentWindow = window.parent
  if (parentWindow.hasOwnProperty('sitebarRoutes')) {
    sitebarRoutes = parentWindow.sitebarRoutes
    sitebarRoutes = sitebarRoutes.filter(item => !(/引导$/).test(item.group))
  }
}


const ROUTE_NAME_REG = /\.\/(\w+)\/demo\/index.vue/

const homeRoutes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('../components/DemoHome'),
    redirect: '/wheel'
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

export default sitebarRoutes
