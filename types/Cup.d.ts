import { MarketComponent } from './component'

export class Cup extends MarketComponent {
  [key: string]: any
  static useTurn(): any
}
export type CupOption = {
  title: string
  image?: string
}

export type CupOptionClick = (e: MouseEvent, i: number) => void

export type CupStartClick = (e: MouseEvent) => void

export type CupOptions = Array<CupOption>
