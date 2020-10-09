import MyWheel, { WheelOptions } from './main'
import Background from './components/background'
import Circle from './components/circle'
import Option, { WheelOption, WheelOptionClick } from './components/option'
import Start from './components/start'
import Rotate from './rotate'
import useRotate from './hooks'

const Wheel = {
  Background,
  Circle,
  Option,
  Start,
}

export { Wheel, Rotate, useRotate }

export default MyWheel

export type { WheelOption, WheelOptions, WheelOptionClick }
