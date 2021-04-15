const pkg = require('../../package.json')
const path = require('path')

const resolve = dir => path.join(__dirname, dir)

module.exports = {
  base:'/' + pkg.name +'/',
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
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Gitlab', link: 'http://gitlab.dui88.com/tuia-frontend/tuia-activity-frontend/market-ui' },
    ],
    sidebar: [
      {
        title: '开发指南',
        collapsable: true,
        children: [
          'pages/guide/install.md',
          'pages/guide/get-started.md'
        ]
      },
      {
        title: '组件',
        collapsable: true,
        children: [
          'pages/components/wheel/README.md'
        ]
      }
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
