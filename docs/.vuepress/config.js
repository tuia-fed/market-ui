const pkg = require('../../package.json')
const path = require('path')

const resolve = dir => path.join(__dirname, dir)

module.exports = {
  base: '/market-ui/', // 部署到https://foo.github.io/market-ui/
  title: pkg.name.toUpperCase(),
  description: pkg.description,
  dest: 'docs/dist',
  head: [
    ['link', { rel: 'icon', href: '/favicon.ico' }]
  ],
  // 本地开发默认主机名
  host: '127.0.0.1',
  // markdown配置,支持自定义传入snippets参数,用于分块html/js/css展示
  // from https://github.com/vuejs/vuepress/issues/2663
  markdown: {
    lineNumbers: false,
    extendMarkdown: md => {
      const fenceRender = md.renderer.rules.fence;
      md.renderer.rules.fence = (...args) => {
        return fenceRender(...args)
        // Javascript regex modified from /^\/\/ ?#?((?:end)?region) ([\w*-]+)$/
        // from https://github.com/vuejs/vuepress/blob/fbf5e5d/packages/%40vuepress/markdown/lib/snippet.js#L43
        .replace(/\/\/ ?#?((?:end)?region) ([\w*-]+)/g, '__REMOVED__')
        // Remove surrounding HTML
        .split('<span class="token comment">__REMOVED__</span>').join('__REMOVED__')
        // Remove surrounding indentation and new line
        .replace(/[ \t]*__REMOVED__\n/g, '')
      }
    }
  },
  plugins: [
    '@vuepress/back-to-top'
  ],
  theme: '@tuia/vuepress-theme',
  themeConfig: {
    searchMaxSuggestions: 10 // 搜索框显示的搜索结果配置
  },
  configureWebpack: {
    resolve: {
      alias: {
        '@': resolve('../../src') // 设置webpack别名
      },
      extensions: ['.ts', '.tsx'],
    },
    module: {
      rules: [
      /* 用于配置vuepress正确加载和解析从外部引入.tsx文件，官方插件`vuepress-plugin-typescript`只适用于在`.vuepress`内部编写ts组件 */
      /* 需要安装的依赖是`@vue/babel-preset-jsx`和`ts-loader` */
        {
          test: /\.tsx?$/,
          exclude: /node_modules/,
          use: [
            {
              loader: 'babel-loader',
              options: {
                babelrc: false,
                configFile: false,
                presets: [
                  '@vue/babel-preset-jsx'
                ]
              }
            },
            {
              loader: 'ts-loader',
              options: {
                transpileOnly: true,
                appendTsxSuffixTo: [/\.vue$/]
              }
            }
          ]
        }
      ]
    }
  }
}
