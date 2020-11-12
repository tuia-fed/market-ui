import { tween, easing } from 'popmotion'
import { TweenInterface } from 'popmotion/lib/animations/tween/types'

type OnUpdate = (angle: number) => void

export interface ToProps {
  index?: number
  to?: number
  duration?: number
  complete: () => void
}

export default class {
  onUpdate: OnUpdate
  angle: number
  splitNum: number
  direction: number
  tw: TweenInterface<number> | undefined

  constructor(onUpdate: OnUpdate, splitNum: number, clockwise: boolean) {
    this.onUpdate = onUpdate
    this.angle = 0
    this.splitNum = splitNum
    this.direction = clockwise ? -1 : 1
  }

  /**
   * 闲置旋转
   */
  idled() {
    this.tw?.stop()

    this.angle %= 360

    this.tw = tween({
      from: this.angle,
      to: this.angle + 360 * this.direction,
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
   * 开始快速旋转
   */
  start() {
    this.tw?.stop()

    this.tw = tween({
      from: this.angle,
      to: this.angle + 360 * this.direction,
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
   * 减速停在某一个位置
   * @param data 配置
   */
  to(data: ToProps) {
    this.tw?.stop()

    let to = 0

    if (
      data.index !== undefined &&
      data.index >= 0 &&
      data.index < this.splitNum
    ) {
      to = data.index
    } else {
      console.error(data.index)
      throw new Error(`目标索引的范围属于 0 <= to < ${this.splitNum}`)
    }

    this.angle = this.angle % 360

    const targetAngle = this.getAngleByIndex(to)
    const toAngle = targetAngle + this.direction * 360 * 2

    console.debug('this.angle', this.angle)
    console.debug('targetIndex', to)
    console.debug('targetAngle', targetAngle)
    console.debug('toAngle', toAngle)

    this.tw = tween({
      from: this.angle,
      to: toAngle,
      duration: data.duration || 3000,
      ease: easing.cubicBezier(0.33, 1, 0.68, 1) // easeOutCubic
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

  /**
   * 根据索引获取目标角度
   * @param index 索引位置
   */
  getAngleByIndex(index: number) {
    return index * (360 / this.splitNum) * this.direction
  }
}
