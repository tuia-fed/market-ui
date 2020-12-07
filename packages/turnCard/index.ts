import MyTurnCard from './src/main'
import { App } from 'vue'

export * from './types'

MyTurnCard.install = (app: App) => {
  app.component(MyTurnCard.name, MyTurnCard)
}

export default MyTurnCard
