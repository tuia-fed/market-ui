import { RotationContainer } from './src/main'
import { App } from 'vue'

// export * from './types'

RotationContainer.install = (app: App) => {
  app.component(RotationContainer.name, RotationContainer)
}

export { RotationContainer }
