export type CarouselOption = {
  image?: string
}

export type CarouselOptions = Array<CarouselOption>

export type CarouselOptionOnClick = (e: MouseEvent, i: number) => void
