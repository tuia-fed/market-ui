export type OnCardClick = (e: MouseEvent, i: number) => void
export type CardOption = {
  cardImg: string
  backImg: string
  turn: boolean
}
export type CardOptions = Array<CardOption>
