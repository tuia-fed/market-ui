import { tween, easing } from 'popmotion'
import { TweenInterface } from 'popmotion/lib/animations/tween/types'

type OnUpdate = (angle: number) => void

export interface ToProps {
  index?: number
  to?: number
  duration?: number
  complete: () => void
}

function getAngleRangeByIndex(index: number) {
  return [30 - 60 * index, 90 - 60 * index]
}

export default class {
  onUpdate: OnUpdate
  angle: number
  tw: TweenInterface<number> | undefined

  constructor(onUpdate: OnUpdate) {
    this.onUpdate = onUpdate
    this.angle = 0
  }

  /**
   * 闲置状态空转
   */
  idled() {
    this.tw?.stop()
    this.tw = tween({
      from: this.angle,
      to: this.angle + 360,
      duration: 10000,
      ease: easing.linear,
      loop: Infinity
    }).start({
      update: (angle: number) => {
        this.angle = angle
        this.onUpdate(angle)
      }
    })
  }

  /**
   * 开始抽奖
   */
  start() {
    this.tw?.stop()
    this.tw = tween({
      from: this.angle,
      to: this.angle + 360,
      duration: 500,
      ease: easing.linear,
      loop: Infinity
    }).start({
      update: (angle: number) => {
        this.angle = angle
        this.onUpdate(angle)
      }
    })
  }

  /**
   * 转到中奖结果处
   * @param data 抽奖结果
   */
  to(data: ToProps) {
    this.tw?.stop()
    let to = 0

    if (data.to !== undefined) {
      to = data.to
    } else if (data.index !== undefined) {
      if (data.index < 0 || data.index > 6) throw Error('index 范围 0-5')
      const angles = getAngleRangeByIndex(data.index)
      to = (angles[0] + angles[1]) / 2
    }

    this.tw = tween({
      from: this.angle,
      to: this.angle + 360 * 2 - (this.angle % 360) + to,
      duration: data.duration || 1000,
      ease: easing.cubicBezier(0.33, 1, 0.68, 1)
    }).start({
      update: (angle: number) => {
        this.angle = angle
        this.onUpdate(angle)
      },
      complete: () => {
        data.complete()
      }
    })
  }
}
