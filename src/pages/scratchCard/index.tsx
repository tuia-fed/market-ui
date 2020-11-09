import { defineComponent, ref } from 'vue'
import ScratchCard from 'packages/scratchCard'
// import { fetchData } from '@/shared/utils'

export default defineComponent({
  name: 'ScratchCardDemo',

  setup() {
    const size = {
      width: 400,
      height: 300
    }
    const cardImg = '' // 可以不提供图片，有默认的卡颜色
    const autoPlay = ref(true) // 是否开启自动刮
    const targetRate = '' // 不提供刮掉面积占比的时候，有一个默认值，刮掉面积达到时进行开奖
    let isPlaying = false // 是否正在刮过程中
    const touchStartAct = () => {
      // 开始刮的时候，要做的事情，比如隐藏引导手势
      if (disabled.value) return
      disabled.value = true
    }

    const touchEndAct = () => {
      // 刮结束了开奖之后的动作
    }

    const disabled = ref(false) // 参与游戏的锁，出结论了才能开锁，可进行下一轮游戏操作

    return () => (
      <>
        <div class="card_bg_img"></div>
        <ScratchCard
          size={size}
          cardImg={cardImg}
          autoPlay={autoPlay.value}
          targetRate={targetRate}
          touchStartAct={touchStartAct}
          touchEndAct={touchEndAct}
          isPlaying={isPlaying}
        />
        <div class="guide_hand"></div>
      </>
    )
  }
})
