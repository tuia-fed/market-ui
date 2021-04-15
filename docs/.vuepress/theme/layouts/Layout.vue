<template>
  <div class="tuia-doc-container">
    <!-- 导航栏 -->
    <Navbar />
    <!-- 侧边栏 -->
    <Sidebar :scrollTop="currentScrollTop" />
    <!-- 代码区 -->
    <!-- Content组件是vuepress内部用于渲染Markdown文件的内容 -->
    <Container :isContainerCover="simulatorDisabled">
      <Content />
    </Container>
    <!-- 模拟器 -->
    <Simulator :isTopFixed="isFixed" v-if="!simulatorDisabled">
      <Content slot-key="demo" />
    </Simulator>
    <!-- 页脚 -->
    <!-- <Footer /> -->
  </div>
</template>
<script>
import Navbar from '../components/Navbar'
import Sidebar from '../components/Sidebar'
import Container from '../components/Container'
import Simulator from '../components/Simulator'
// import Footer from '../components/Footer'
import { throttle } from '../utils'
// 不展示手机模拟器效果匹配的路由列表(开发指南路由)
const disabledSimmulatorRoutes = ['README.md', 'pages/guide/install.md', 'pages/guide/get-started.md']

export default {
  name: 'Layout',
  data: () => ({
    isFixed: false,
    scrollListener: null,
    currentScrollTop: 0,
    simulatorDisabled: false
  }),
  components: {
    Navbar,
    Sidebar,
    Container,
    Simulator
    // Footer
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
    }, 50)
    window.addEventListener('scroll', this.scrollListener)
  },
  beforeDestroy() {
    window.removeEventListener('scroll', this.scrollListener)
  },
  created() {
    this.simulatorDisabled = disabledSimmulatorRoutes.includes(this.$page.relativePath)
  }
}
</script>
