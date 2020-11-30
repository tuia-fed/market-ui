import MyCup from './src/main'
import { App } from 'vue'

export * from './types'

MyCup.install = (app: App) => {
  app.component(MyCup.name, MyCup)
}

export default MyCup
