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
      <!-- 模拟器 -->
      <div slot="simulator">
        <Simulator :src="simulatorPath"></Simulator>
      </div>
      <!-- 页脚 -->
      <div slot="footer">
        <Footer />
      </div>
    </Container>
  </div>
</template>
<script>
import Navbar from '../components/Navbar'
import Sidebar from '../components/Sidebar'
import Container from '../components/Container'
import Simulator from '../components/Simulator'
import Footer from '../components/Footer'
import { throttle, DOC_PUBLICPATH, DOC_DEVPORT } from '../utils'

export default {
  name: 'Layout',
  data() {
    return {
      scrollListener: null,
      iframeListener: null,
      currentScrollTop: 0,
      simulatorDisabled: false,
      basicPath: ''
    }
  },
  components: {
    Navbar,
    Sidebar,
    Container,
    Simulator,
    Footer
  },
  computed: {
    simulatorPath() {
      let hash = '/'
      if (this.$route.path.startsWith('/components')) {
        hash = this.$route.path.split('/components')[1]
      }
      return `${this.basicPath}/#${hash}`
    }
  },
  mounted() {
    /* 监听页面滚动 */
    this.scrollListener = throttle(e => {
      const scrollTop = document.documentElement.scrollTop || document.body.scrollTop
      this.currentScrollTop = scrollTop
    }, 20)
    window.addEventListener('scroll', this.scrollListener)
    /* 监听iframe子页面发送的消息 */
    this.iframeListener = (e) => {
      const skipPath = e.data.path
      // 当前所在页面路由
      const currentPagePath = this.$page.path
      // 避免路由重复跳转
      if (skipPath && skipPath !== currentPagePath) {
        this.$router.push(`${skipPath}`).catch(err => {
          console.info(err.message)
        })
      }
    }
    window.addEventListener('message', this.iframeListener, false)
    // 动态引入库，避免build的时候报错，window is not defined
    import('../utils').then(module => {
      const { iframeConfigPath } = module
      this.basicPath = iframeConfigPath(DOC_DEVPORT) + `${DOC_PUBLICPATH}`
    })
  },
  beforeDestroy() {
    window.removeEventListener('scroll', this.scrollListener)
    window.removeEventListener('message', this.iframeListener)
  }
}
</script>
