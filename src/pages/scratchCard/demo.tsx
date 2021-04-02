import { defineComponent, getCurrentInstance, ref } from 'vue'
import ScratchCard from 'packages/ScratchCard'

export default defineComponent({
  name: 'ScratchCardDemo',

  setup() {
    const width = 689 / 2
    const height = 402 / 2
    const paintCoat = '//yun.dui88.com/tact/scratchCard/cardBg.png' // 可以不提供图片，有默认的卡颜色
    const autoPlay = ref(true) // 是否开启自动刮
    const targetRate = 0 // 不提供刮掉面积占比的时候，有一个默认值，刮掉面积达到时进行开奖
    const disabled = ref(false)

    const autoPoints: Array<Array<number>> = [
      [300, 40],
      [90, 90],
      [330, 120],
      [70, 210],
      [330, 260]
    ]

    const bgImg = '//yun.tuisnake.com/babi/img/46de46c2-ngat6glknm.jpg'

    const internalInstance = getCurrentInstance()

    const touchStartAct = (
      e: TouchEvent | MouseEvent,
      resolveAct: Function
    ) => {
      // 开始刮的时候，要做的事情，比如隐藏引导手势
      internalInstance?.appContext.config.globalProperties.$toast('结束刮卡')

      return new Promise<void>((resolve, reject) => {
        if (disabled.value) reject()

        internalInstance?.appContext.config.globalProperties.$toast('开始刮了')

        disabled.value = true
        resolveAct && resolveAct()
        resolve()
      })
    }

    const touchEndAct = (e: TouchEvent | MouseEvent) => {
      // 刮结束了开奖之后的动作
      disabled.value = false

      internalInstance?.appContext.config.globalProperties.$toast('结束刮卡')
    }

    return () => (
      <>
        <div
          class="card_bg_img"
          style={{
            background: `url(${bgImg}) no-repeat `,
            backgroundSize: 'auto 100%',
            backgroundPosition: 'center center',
            width: width + 'px',
            height: height + 'px'
          }}
        ></div>
        <ScratchCard
          width={width}
          height={height}
          paintCoat={paintCoat}
          autoPlay={autoPlay.value}
          targetRate={targetRate}
          onTouchStart={touchStartAct}
          onTouchEnd={touchEndAct}
          autoPoints={autoPoints}
        />
        <div class="guide_hand"></div>
      </>
    )
  }
})
