import { App } from 'vue'
import { installOptions, toastOptions } from './type'
import './render.less'

/**
 * 容器元素
 */
let container: HTMLElement

/**
 * 获取容器
 */
function getContainerEl() {
  if (!container) {
    container = document.createElement('div')

    container.className = 'mk-toast_container'

    document.body.appendChild(container)
  }

  return container
}

/**
 * 淡出移除
 * @param parent 父容器元素
 * @param el 目标元素
 */
function fadeOut(parent: HTMLElement, el: HTMLElement) {
  el.style.transitionProperty = 'all'
  el.style.transitionDuration = '0.2s'
  el.style.opacity = '0'

  setTimeout(() => parent.removeChild(el), 200)
}

function renderToast(app: App, options: installOptions) {
  const toast = (text: string, localOptions: toastOptions) => {
    if (!localOptions) {
      localOptions = {}
    }

    const el = document.createElement('div')
    const parent = getContainerEl()
    const duration: number | undefined = localOptions.duration
      ? localOptions.duration
      : options.duration
    let clicked: boolean

    el.className = 'mk-toast_instance'

    if (text) {
      el.textContent = text
    }

    // 点击消失
    el.addEventListener('click', () => {
      clicked = true
      fadeOut(parent, el)
    })

    parent.appendChild(el)

    // 超时消失
    setTimeout(() => {
      if (!clicked) {
        fadeOut(parent, el)
      }
    }, duration)
  }

  app.config.globalProperties.$toast = toast
}

export default renderToast
