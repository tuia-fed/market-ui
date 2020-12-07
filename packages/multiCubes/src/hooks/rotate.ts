import { tween, easing } from 'popmotion'
import { TweenInterface } from 'popmotion/lib/animations/tween/types'

type OnUpdate = (activeIndex: number) => void

export interface StopProps {
  index: number
  duration?: number
  complete?: () => void
}
export interface InitOption {
  rowNum: number
  idledSpeed: number
  drawSpeed: number
  onUpdate: OnUpdate
}

export default class {
  onUpdate: OnUpdate
  activeIndex: number
  tw: TweenInterface<number> | undefined
  idledSpeed: number
  drawSpeed: number
  cubesNum: number

  constructor(option: InitOption) {
    this.activeIndex = 0
    this.onUpdate = option.onUpdate
    this.idledSpeed = option.idledSpeed // 空转时每走一格的时间
    this.drawSpeed = option.drawSpeed // 抽奖时每走一格的时间
    this.cubesNum = Math.pow(option.rowNum, 2) - Math.pow(option.rowNum - 2, 2)
  }

  toStartIndex(type: number, stopData?: StopProps) {
    // 先回到index 0
    this.tw?.stop()
    const leavelNums = this.cubesNum - this.activeIndex
    this.tw = tween({
      from: this.activeIndex,
      to: this.activeIndex + leavelNums,
      duration:
        type === 1 ? this.idledSpeed * leavelNums : this.drawSpeed * leavelNums,
      ease: easing.linear
    }).start({
      update: (index: number) => {
        this.activeIndex = Math.floor(index)
        this.onUpdate(Math.floor(index))
      },
      complete: () => {
        this.onUpdate(0)
        if (type === 1) {
          this.trueIdled()
        }
        if (type === 2) {
          this.trueStart()
        }
        if (type === 3) {
          this.trueStop(stopData as StopProps)
        }
      }
    })
  }

  /**
   * 闲置状态空转
   */
  idled() {
    this.tw?.stop()
    this.toStartIndex(1)
  }

  /**
   * 空转的执行函数
   */
  trueIdled() {
    this.tw?.stop()
    this.tw = tween({
      from: 0,
      to: this.cubesNum,
      duration: this.idledSpeed * this.cubesNum,
      ease: easing.linear,
      loop: 10000
    }).start({
      update: (index: number) => {
        this.activeIndex = Math.floor(index)
        this.onUpdate(Math.floor(index))
      },
      complete: () => {
        location.reload()
      }
    })
  }

  /**
   * 开始抽奖
   */
  start() {
    this.tw?.stop()
    this.toStartIndex(2)
  }

  /**
   * 抽奖的的执行函数
   */
  trueStart() {
    this.tw?.stop()
    this.tw = tween({
      from: 0,
      to: this.cubesNum,
      duration: this.drawSpeed * this.cubesNum,
      ease: easing.linear,
      loop: 10000
    }).start({
      update: (index: number) => {
        this.activeIndex = Math.floor(index)
        this.onUpdate(Math.floor(index))
      }
    })
  }

  /**
   * 停止函数
   */
  stop(data: StopProps) {
    this.tw?.stop()
    this.toStartIndex(3, data)
  }

  /**
   * 停止的执行函数
   */
  trueStop(data: StopProps) {
    this.tw?.stop()
    const { index } = data
    this.tw = tween({
      from: 0,
      to: index,
      duration: this.drawSpeed * index,
      ease: easing.easeOut
    }).start({
      update: (index: number) => {
        this.activeIndex = Math.floor(index)
        this.onUpdate(Math.floor(index))
      },
      complete: () => {
        data.complete && data.complete()
      }
    })
  }
}
