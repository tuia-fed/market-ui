import { MarketComponent } from './component'
export type UseRotateOption = {
  rowNum: number
  idledSpeed?: number
  drawSpeed?: number
}

export class MultiCubes extends MarketComponent {
  static useRotate(useRotateOption: UseRotateOption): any
}

export type MultiCubesOption = {
  title: string
  image?: string
  optionIndex?: number
  active?: boolean
}
export type MultiCubesItemClick = (e: MouseEvent, i: number) => void
export type MultiCubesOptions = Array<MultiCubesOption>
