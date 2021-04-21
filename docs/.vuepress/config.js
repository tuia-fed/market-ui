const pkg = require('../../package.json')
const path = require('path')
const getThemeConfig = require('vuepress-bar')

const resolve = dir => path.join(__dirname, dir)

// 从docs根目录下动态获取.md文档生成侧边栏导航路由
const { sidebar } = getThemeConfig()

module.exports = {
  base: '/',
  title: pkg.name.toUpperCase(),
  description: pkg.description,
  dest: 'docs/dist',
  head: [
    ['link', { rel: 'icon', href: '/favicon.ico' }]
  ],
  markdown: {
    lineNumbers: false
  },
  plugins: [
    '@vuepress/back-to-top'
  ],
  themeConfig: {
    sidebar: [
      ...sidebar
    ]
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
