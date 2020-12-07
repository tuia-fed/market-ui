import Carousel from './src/main'
import { App } from 'vue'

export * from './types'

Carousel.install = (app: App) => {
  app.component(Carousel.name, Carousel)
}

export default Carousel