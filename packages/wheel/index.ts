import MyWheel from './src/main'
import { App } from 'vue'

MyWheel.install = (app: App) => {
  app.component(MyWheel.name, MyWheel)
}

export default MyWheel
