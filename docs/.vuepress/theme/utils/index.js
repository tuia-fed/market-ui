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
    if (iframe.contentWindow.replacePath) {
      callback()
    } else {
      setTimeout(() => {
        interval();
      }, 50)
    }
  }

  if (doc.readyState === 'complete') {
    interval()
  } else {
    iframe.onload = interval
  }
}
