import MultiCubes from './src/main'
import { App } from 'vue'

export * from './types'

MultiCubes.install = (app: App) => {
  app.component(MultiCubes.name, MultiCubes)
}

export default MultiCubes
