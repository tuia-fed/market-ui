import { tween, easing } from 'popmotion'
import { TweenInterface } from 'popmotion/lib/animations/tween/types'

type OnUpdate = (angle: number) => void

export interface ToProps {
  index?: number
  duration?: number
  complete: () => void
}

export default class {
  onUpdate: OnUpdate
  angle: number
  endAngle: number
  correctWidth: number
  tw: TweenInterface<number> | undefined

  constructor(onUpdate: OnUpdate, angle: number, correctWidth: number) {
    this.onUpdate = onUpdate
    this.angle = -angle
    this.endAngle = angle - correctWidth
    this.correctWidth = correctWidth
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
  start(noReset: boolean) {
    console.log('111', this.angle)
    this.tw?.stop()
    this.tw = tween({
      from: this.angle,
      to: this.endAngle,
      duration: 500,
      ease: easing.linear,
      loop: 100000
    }).start({
      update: (angle: number) => {
        this.angle = angle
        this.onUpdate(angle)
        if (!noReset && angle === this.endAngle) {
          // 开始滚动第一段结束后重置为快速滚动，用户不同时机的点击会导致快速滚动参数不同
          this.angle = -angle
          this.onUpdate(-angle)
          this.start(true)
        }
      }
    })
  }

  stop(data: ToProps, noReset: boolean) {
    console.log('111', this.angle)
    this.tw?.stop()
    let to = 0
    if (data.index !== undefined) {
      to = this.correctWidth * data.index
    }
    this.tw = tween({
      from: this.angle,
      to: noReset ? to : this.endAngle,
      duration: data.duration || 500,
      ease: easing.reversed(easing.linear)
    }).start({
      update: (angle: number) => {
        this.angle = angle
        this.onUpdate(angle)
        if (!noReset && angle === this.endAngle) {
          this.angle = -angle
          this.onUpdate(-angle)
          this.stop(data, true)
        }
      },
      complete: () => {
        data.complete()
      }
    })
  }
}
