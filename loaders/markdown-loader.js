const MarkdownIt = require('markdown-it')
const hljs = require('highlight.js')
const javascript = require('highlight.js/lib/languages/javascript')
hljs.registerLanguage('javascript', javascript)
const md = new MarkdownIt({
  highlight: function (str, lang) {
    if (lang && hljs.getLanguage(lang)) {
      try {
        return `<pre class="hljs"><code class="language-${lang} hljs">${hljs.highlight(lang, str, true).value}</code></pre>`
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
    mounted() {
      const cardDOM = document.querySelector('.markdown > pre:nth-child(2).hljs:nth-of-type(1)')
      
      if (!cardDOM) return
      
      const height = cardDOM.getBoundingClientRect().height || 0
      const foldText = '显示完整代码>>'
      const unfoldText = '隐藏完整代码<<'
      let isFold
  
      if (height > 425) {
        cardDOM.classList.add('fold')
        isFold = true
      }
  
      const footer = document.createElement('div')
      
      footer.innerText = foldText
      footer.classList.add('footer')
  
      footer.addEventListener('click', () => {
        if (isFold) {
          isFold = false
          footer.innerText = unfoldText
  
          cardDOM.classList.remove('fold')
          cardDOM.classList.add('unfold')
        } else {
          isFold = true
          footer.innerText = foldText
  
          cardDOM.classList.remove('unfold')
          cardDOM.classList.add('fold')
        }
      })
  
      cardDOM.appendChild(footer)
    },

    render () {
      return h('section', { innerHTML: content, class: 'markdown' })
    }
  })`
}