const MarkdownIt = require('markdown-it')
const hljs = require('highlight.js')
const javascript = require('highlight.js/lib/languages/javascript')
hljs.registerLanguage('jvascript', javascript)
const md = new MarkdownIt({
  highlight: function (str, lang) {
    if (lang && hljs.getLanguage(lang)) {
      try {
        return hljs.highlight(lang, str, true).value;
      } catch (error) {
        console.log(error)
      }
    }

    return ''; // 使用额外的默认转义
  }
})

module.exports = function (source) {
  source = md.render(source)
  source = escape(source)
  return `import { defineComponent, h } from 'vue'

  const content = unescape(\`${source}\`);
  
  export default defineComponent({
    render () {
      return h('section', { innerHTML: content, class: 'markdown' })
    }
  })`
}