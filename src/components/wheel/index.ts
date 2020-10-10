import MyWheel from './main'
import Background from './components/background'
import Circle from './components/circle'
import Option from './components/option'
import Start from './components/start'
import Rotate from './rotate'
import useRotate from './hooks'

const Wheel = {
  Background,
  Circle,
  Option,
  Start
}

export * from './types'

export { Wheel, Rotate, useRotate }

export default MyWheel
