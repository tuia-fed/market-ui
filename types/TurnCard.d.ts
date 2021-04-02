import { MarketComponent } from './component'

export class TurnCard extends MarketComponent {
  [key: string]: any
  static useAnimation(currentIndex: number, options: CardOptions): any
}
export type OnCardClick = (e: MouseEvent, i: number) => void
export type CardOption = {
  cardImg: string
  backImg: string
  turn: boolean
}
export type CardOptions = Array<CardOption>
