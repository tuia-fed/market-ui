import { defineAsyncComponent } from 'vue'
import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'

const files = require.context('../pages', true, /index\.tsx$/)

const ROUTE_NAME_REG = /\.\/(\w+)\/index.tsx/

const routes: RouteRecordRaw[] = files.keys().map(name => {
  const match = name.match(ROUTE_NAME_REG)

  if (match) {
    name = match[1]
  }

  return {
    path: name === 'home' ? '/' : `/${name}`,
    name,
    component: defineAsyncComponent(() => import(`../pages/${name}`))
  }
})

export default createRouter({
  history: createWebHashHistory(),
  routes
})
