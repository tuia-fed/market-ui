import { MarketComponent } from './component'

export class Carousel extends MarketComponent {
  [key: string]: any
  static useRotate(angle: number, splitNum: number, clockwise: boolean): any
}

export type CarouselOption = {
  image?: string
}
export type CarouselOptions = Array<CarouselOption>
export type CarouselOptionOnClick = (e: MouseEvent, i: number) => void
