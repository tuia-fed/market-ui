const pkg = require('../../package.json')

module.exports = {
  base:'/' + pkg.name +'/',
  title: pkg.name.toUpperCase(),
  description: pkg.description,
  dest: 'docs/dist',
  head: [
    ['link', { rel: 'icon', href: '/favicon.ico' }]
  ],
  markdown: {
    lineNumbers: true
  },
  plugins: [
    '@vuepress/back-to-top',
    '@vuepress/active-header-links'
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
          'pages/components/wheel/',
          'pages/components/toast/'
        ]
      },
    ]
  }
}