import MultiCubes from './src/main'
import { App } from 'vue'

MultiCubes.install = (app: App) => {
  app.component(MultiCubes.name, MultiCubes)
}

export default MultiCubes
