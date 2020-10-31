const MarkdownIt = require('markdown-it')
const hljs = require('highlight.js')
const md = new MarkdownIt({
  highlight: function (str, lang) {
    if (lang && hljs.getLanguage(lang)) {
      try {
        return hljs.highlight(lang, str).value;
      } catch (__) {}
    }

    return ''; // 使用额外的默认转义
  }
})

module.exports = function (source) {
  source = md.render(source)
  source = escape(source)
  return `import { defineComponent, h } from 'vue'
  import hljs from 'highlight.js'
  import javascript from 'highlight.js/lib/languages/javascript'
  import 'highlight.js/styles/github.css'
  
  hljs.registerLanguage('javascript', javascript)

  const content = unescape(\`${source}\`);
  
  export default defineComponent({
    render () {
      return h('section', { innerHTML: content })
    }
  })`
}