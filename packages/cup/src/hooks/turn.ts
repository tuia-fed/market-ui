interface UpdateObj {
  list: number[]
  direction: string
  cupNumber: number
  interval: number
}
type OnUpdate = (obj: UpdateObj) => void

export interface ToProps {
  interval?: number
  times?: number
  complete: () => void
}

const delay = async (t: number) => {
  return new Promise(resolve => {
    setTimeout(resolve, t)
  })
}

export default class {
  onUpdate: OnUpdate
  interval: number
  times: number
  // duration?: number
  list: Array<number>
  direction: string
  cupNumber: number
  step: number

  constructor(
    onUpdate: OnUpdate,
    list: number[],
    direction: string,
    cupNumber: number
  ) {
    this.onUpdate = onUpdate

    this.list = list
    this.direction = direction
    this.cupNumber = cupNumber

    this.interval = 0.5
    this.times = 20
    this.step = 0
  }

  private update() {
    this.onUpdate({
      list: this.list,
      direction: this.direction,
      cupNumber: this.cupNumber,
      interval: this.interval
    })
  }

  private async move() {
    if (Math.round(Math.random())) {
      this.direction = 'right'
      this.list[1] = [this.list[2], (this.list[2] = this.list[1])][0]
      this.update()
    } else {
      this.direction = 'left'
      this.list[1] = [this.list[0], (this.list[0] = this.list[1])][0]
      this.update()
    }
    await delay(this.interval * 1000).then(() => {
      this.direction = ''
      this.update()
    })
  }

  async start(interval?: number, times?: number) {
    interval && (this.interval = interval)
    this.update()
    times && (this.times = times)
    if (this.cupNumber !== -1) return
    this.step = 0
    this.cupNumber = this.list.indexOf(1)
    this.update()
    await delay(2000)
    for (let i = 0; i < this.times; i++) {
      await this.move()
      await delay(100)
    }
    this.step = 1
    this.cupNumber = -1
    this.update()
  }

  cupUp(index: number) {
    return new Promise(resolve => {
      if (this.cupNumber !== -1 || this.step === 0) return
      this.cupNumber = index
      this.update()
      delay(2000).then(() => {
        this.cupNumber = -1
        this.update()
        resolve()
      })
    })
  }

  reset() {
    this.step = 0
  }
}
