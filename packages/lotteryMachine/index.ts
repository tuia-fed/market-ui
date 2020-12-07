import LotteryMachine from './src/main'
import { App } from 'vue'

// export * from './types'

LotteryMachine.install = (app: App) => {
  app.component(LotteryMachine.name, LotteryMachine)
}

export default LotteryMachine
