import ScratchCard from './src/main'
import { App } from 'vue'

ScratchCard.install = (app: App) => {
  app.component(ScratchCard.name, ScratchCard)
}

export default ScratchCard
