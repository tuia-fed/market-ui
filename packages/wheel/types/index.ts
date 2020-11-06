export type WheelOption = {
  title: string
  image?: string
}

export type WheelOptionClick = (e: MouseEvent, i: number) => void

export type WheelOptions = Array<WheelOption>
