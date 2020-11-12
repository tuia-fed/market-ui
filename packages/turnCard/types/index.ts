export type CardClick = (e: MouseEvent, i: number) => void
export type CardOption = {
  cardImg: string
  backImg: string
  itemImg?: string
}
export type CardOptions = Array<CardOption>
