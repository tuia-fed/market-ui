/* 防抖 */
export function debounce (fn, delay) {
  return function (args) {
    const that = this
    const _args = args
    clearTimeout(fn.id)
    fn.id = setTimeout(() => {
      fn.call(that, _args)
    }, delay)
  }
}

/* 节流 */
export function throttle (fn, delay) {
  let last, deferTimer
  return function (args) {
    const that = this
    const _args = args
    const now = +Date.now()
    if (last && now < last + delay) {
      clearTimeout(deferTimer)
      deferTimer = setTimeout(() => {
        fn.apply(that, _args)
      }, delay)
    } else {
      last = now
      fn.apply(that, _args)
    }
  }
}

/* iframe加载完成 */
export function iframeReady (iframe, callback) {
  const doc = iframe.contentDocument || iframe.contentWindow.document
  const interval = () => {
    if (iframe.contentWindow) {
      callback()
    } else {
      setTimeout(() => {
        interval()
      }, 50)
    }
  }

  if (doc.readyState === 'complete') {
    interval()
  } else {
    iframe.onload = interval
  }
}

/* 配置iframe的开发生产基础路径 */
export function iframeConfigPath (iframePort = '8080') {
  const { protocol, hostname, port } = window.location
  const localPathExp = /^127\.0\.0\.1$/
  let basicPath = ''
  if (localPathExp.test(hostname) || port === '8080') { // 本地开发
    basicPath = `${protocol}//${hostname}:${iframePort}`
  }
  return basicPath
}

/* 基础demo服务配置 */
export const DOC_PUBLICPATH = '/demo'
export const DOC_DEVPORT = '2222'

/* 侧边栏默认分组顺序 */
export const sidebarGroupLevels = [
  {
    group: '引导',
    level: 1
  },
  {
    group: '业务组件',
    level: 2
  },
  {
    group: '基础组件',
    level: 3
  }
]
