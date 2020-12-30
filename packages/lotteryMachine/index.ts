import LotteryMachine from './src/main'
import { App } from 'vue'

LotteryMachine.install = (app: App) => {
  app.component(LotteryMachine.name, LotteryMachine)
}

export default LotteryMachine
