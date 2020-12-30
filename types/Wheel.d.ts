import { MarketComponent } from './component'

export class Wheel extends MarketComponent {
  [key: string]: any
  static useRotate(angle: number): any
}
export type WheelOption = {
  title: string
  image?: string
}
export type WheelOptionClick = (e: MouseEvent, i: number) => void
export type WheelOptions = Array<WheelOption>
