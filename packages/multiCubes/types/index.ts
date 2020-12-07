export type MultiCubesOption = {
  title: string
  image?: string
  optionIndex?: number
  active?: boolean
}

export type MultiCubesItemClick = (e: MouseEvent, i: number) => void

export type MultiCubesOptions = Array<MultiCubesOption>