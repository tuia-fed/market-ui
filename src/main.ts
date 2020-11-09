import { createApp } from 'vue'
import router from './router'
import App from './App'
import './main.less'
import hljs from 'highlight.js'
// import javascript from 'highlight.js/lib/languages/javascript'
// hljs.registerLanguage('javascript', javascript)
// 引入高亮的基础样式
// import 'highlight.js/styles/default.css'
// import 'highlight.js/styles/github.css'
// 开启onload之后渲染
hljs.initHighlightingOnLoad()

const app = createApp(App)

app.use(router)

app.mount('#app')
