import Vue from 'vue'
import VueRouter from 'vue-router'
import { nav, NavItemType } from '../config';

const routes = [];
function makeRoute(config: NavItemType) {
  if (config.path && config.path.startsWith('components')) {
    const path = config.path.split('/')[1];
    routes.push({
      path: `/${path}`,
      name: config.title,
      component: () => import(`../../src/${path}/demo`),
      meta: {
        name: config.title
      }
    })
  } else if (config.items) {
    makeRoutes(config.items);
  }
}
function makeRoutes(configs: NavItemType[]) {
  configs.forEach(it => makeRoute(it));
}
makeRoutes(nav);

routes.push({
  path: '/',
  name: 'Home',
  component: () => import('../components/DemoHome')
});

// 全局调用VueRouter插件
Vue.use(VueRouter)

export const router = new VueRouter({
  mode: 'hash',
  routes: routes,
  scrollBehavior: (to, from, savedPosition) => savedPosition || { x: 0, y: 0 },
})
