import { ref, Ref } from 'vue'
import { CardOptions } from 'packages/turnCard/types'

class Animation {
  activeIndex: Ref<number>
  options: Ref<CardOptions>
  isRunning: boolean
  maxIndex: number
  timer?: number | null
  lastIndex?: number

  constructor(currentIndex: Ref<number>, options: Ref<CardOptions>) {
    this.activeIndex = currentIndex
    this.options = options
    this.maxIndex = options.value.length - 1
    this.isRunning = false
  }

  start(duration: number) {
    if (this.isRunning) return
    this.isRunning = true

    this.timer = setInterval(() => {
      if (this.activeIndex.value === this.maxIndex) {
        this.activeIndex.value = 0
        return
      }

      function findNextIndex(currentIndex: number, options: CardOptions) {
        for (let i = currentIndex + 1; i < options.length; i++) {
          if (!options[i].turn) return i
        }

        return -1
      }

      // 当前往后查找
      const nextIndex = findNextIndex(
        this.activeIndex.value,
        this.options.value
      )
      if (nextIndex >= 0) {
        this.activeIndex.value = nextIndex
      } else {
        // 如果不存在，则从头往后再查找一次，其实查找到当前值即可
        const againNextIndex = findNextIndex(-1, this.options.value)
        if (againNextIndex === -1) {
          // 找不到，则说明不存在未翻转到卡片，可以停止了
          this.stop()
        } else {
          this.activeIndex.value = againNextIndex
        }
      }
    }, duration || 1000)
  }

  stop() {
    // 保存上次停止的下标
    this.lastIndex = this.activeIndex.value
    // 当前激活的index设置为-1
    this.activeIndex.value = -1
    // 清除定时器
    if (this.timer) {
      clearInterval(this.timer)
      this.timer = null
      this.isRunning = false
    }
  }

  reset() {
    for (let i = 0; i < this.options.value.length; i++) {
      this.options.value[i].turn = false
    }
  }

  turnBack(i: number) {
    this.options.value[i].turn = true
  }
}

export default function(currentIndex: number, options: CardOptions) {
  const activeIndex = ref(currentIndex)
  const cardOptions = ref(options)
  const game = new Animation(activeIndex, cardOptions)

  return [activeIndex, cardOptions, game] as const
}
