<template>
  <div class="tuia-doc-container">
    <!-- 导航栏 -->
    <Navbar />
    <!-- 侧边栏 -->
    <Sidebar :scrollTop="currentScrollTop" />
    <!-- 代码区 -->
    <!-- Content组件是vuepress内部用于渲染Markdown文件的内容 -->
    <Container>
      <Content />
    </Container>
    <!-- <Content slot-key="demo" /> -->
    <!-- 模拟器 -->
    <Simulator :isTopFixed="isFixed" :src="simulatorPath" ref="simulator"></Simulator>
  </div>
</template>
<script>
import Navbar from '../components/Navbar'
import Sidebar from '../components/Sidebar'
import Container from '../components/Container'
import Simulator from '../components/Simulator'
import { throttle } from '../utils'
// 不展示手机模拟器效果匹配的路由列表(开发指南路由)
const disabledSimmulatorRoutes = ['README.md', 'guide/install/README.md', 'guide/get-started/README.md']

export default {
  name: 'Layout',
  data() {
    // const path = location.pathname.replace(/\/index(\.html)?/, '/')

    return {
      isFixed: false,
      scrollListener: null,
      currentScrollTop: 0,
      simulatorDisabled: false,
      simulatorHash: ''
    }
  },
  components: {
    Navbar,
    Sidebar,
    Container,
    Simulator
  },
  computed: {
    simulatorPath() {
      const { protocol, hostname } = window.location
      const basicPath = `${protocol}//${hostname}:2222/demo.html`
      let iframePath = ''
      if (this.simulatorHash) {
        iframePath = `${basicPath}/#${this.simulatorHash}`
      } else {
        iframePath = basicPath
      }
      return iframePath
    }
  },
  watch: {
    '$route'(to, from) {
      const currentPath = to.path // 当前页面路由
      if (/^\/components/.test(currentPath)) { // 匹配到组件路由
        this.simulatorHash = currentPath.split('/components')[1]
      } else {
        this.simulatorHash = ''
      }
    },
    // '$page.relativePath': {
    //   handler: function(newVal) {
    //     console.log(newVal)
    //   },
    //   immediate: true
    // }
  },
  mounted() {
    const that = this
    this.scrollListener = throttle(function(e) {
      const scrollTop = document.documentElement.scrollTop || document.body.scrollTop
      that.currentScrollTop = scrollTop
      if (scrollTop >= 60) {
        that.isFixed = true
      } else {
        that.isFixed = false
      }
    }, 20)
    window.addEventListener('scroll', this.scrollListener)
  },
  beforeDestroy() {
    window.removeEventListener('scroll', this.scrollListener)
  }
}
</script>
