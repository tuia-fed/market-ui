import { tween, easing } from 'popmotion'
import { TweenInterface } from 'popmotion/lib/animations/tween/types'

type OnUpdate = (angle: number) => void

export default class {
  onUpdate: OnUpdate
  angle: number
  startAngle: number
  tw: TweenInterface<number> | undefined

  constructor(onUpdate: OnUpdate, angle: number, startAngle: number) {
    this.onUpdate = onUpdate
    this.angle = angle
    this.startAngle = startAngle
  }

  /**
   * 闲置状态滚动
   */
  idled(duration: number) {
    this.tw?.stop()
    this.tw = tween({
      from: this.angle,
      to: this.angle + this.startAngle,
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
      to: this.angle + this.startAngle,
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

  stop(index: number) {
    console.log(index)
  }
}
