import { tween, easing } from 'popmotion'
import { TweenInterface } from 'popmotion/lib/animations/tween/types'

type OnUpdate = (angle: number) => void
type stopPosition = (index: number) => number

export interface ToProps {
  index?: number
  duration?: number
  complete: () => void
}

export default class {
  onUpdate: OnUpdate
  stopPosition: stopPosition
  angle: number
  endAngle: number
  startAngle: number
  correctWidth: number
  tw: TweenInterface<number> | undefined

  constructor(
    onUpdate: OnUpdate,
    angle: number,
    correctWidth: number,
    stopPosition: stopPosition
  ) {
    this.onUpdate = onUpdate
    this.angle = -angle
    this.startAngle = angle
    this.endAngle = -angle + correctWidth
    this.correctWidth = correctWidth
    this.stopPosition = stopPosition
  }

  /**
   * 闲置状态滚动
   */
  idled(duration: number) {
    this.tw?.stop()
    this.tw = tween({
      from: this.angle,
      to: this.endAngle,
      duration: duration,
      ease: easing.linear,
      loop: 100000
    }).start({
      update: (angle: number) => {
        this.angle = angle
        this.onUpdate(angle)
      }
    })
  }

  /**
   * 闲置状态滚动
   */
  start() {
    this.tw?.stop()
    this.tw = tween({
      from: this.angle,
      to: this.angle + this.correctWidth,
      duration: 500,
      ease: easing.linear,
      loop: 100000
    }).start({
      update: (angle: number) => {
        this.angle = angle
        this.onUpdate(angle)
      }
    })
  }

  /**
   * 停止
   * @param data
   * @param noReset
   */
  stop(data: ToProps, noReset: boolean) {
    this.tw?.stop()
    let to = 0
    if (data.index !== undefined) {
      to = this.stopPosition(data.index)
    }
    if (!noReset) {
      this.angle -= this.correctWidth
      to = this.endAngle
    }
    this.tw = tween({
      from: this.angle,
      to: to,
      duration: data.duration || 500,
      ease: easing.linear
    }).start({
      update: (angle: number) => {
        this.angle = angle
        this.onUpdate(angle)
      },
      complete: () => {
        if (!noReset) {
          this.angle -= this.correctWidth
          this.onUpdate(this.angle)
          this.stop(data, true)
        } else {
          data.complete()
        }
      }
    })
  }

  /**
   * 重置
   */
  reset(duration: number) {
    this.angle = -this.startAngle
    this.idled(duration)
  }
}
