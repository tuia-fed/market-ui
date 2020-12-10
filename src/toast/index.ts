import { App } from 'vue'
import renderToast from './render'
import { installOptions } from './type'

const toastPlugin = {
  install: (app: App, options: installOptions) => {
    if (!options) {
      options = {}
    }

    // 默认出现 3s
    if (!options.duration) {
      options.duration = 3000
    }

    renderToast(app, options)
  }
}

export default toastPlugin
