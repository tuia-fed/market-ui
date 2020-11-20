import { defineComponent, ref } from 'vue'
import ScratchCard from 'packages/scratchCard'

export default defineComponent({
  name: 'ScratchCardDemo',

  setup() {
    const width = 400
    const height = 300
    const paintCoat = '//yun.dui88.com/tact/scratchCard/cardBg.png' // 可以不提供图片，有默认的卡颜色
    const autoPlay = ref(true) // 是否开启自动刮
    const targetRate = 0 // 不提供刮掉面积占比的时候，有一个默认值，刮掉面积达到时进行开奖
    let isPlaying = false // 是否正在刮过程中
    const autoPoints: Array<Array<number>> = [
      [300, 40],
      [90, 90],
      [330, 120],
      [70, 210],
      [330, 260]
    ]
    let isShowCanvas = 'block'

    const bgImg =
      '//yun.dui88.com/h5-mami/farm-redpacket/newcomer/8.1/btn-get.png'

    const touchStartAct = () => {
      // 开始刮的时候，要做的事情，比如隐藏引导手势
      isPlaying = true
      console.log('开始刮了')
    }

    const touchEndAct = () => {
      // 刮结束了开奖之后的动作
      isPlaying = false
      console.log('结束刮卡')
      isShowCanvas = 'none' // 为什么没有生效呢 TODO
    }

    return () => (
      <>
        <div
          class="card_bg_img"
          style={{
            background: `url(${bgImg})no-repeat`,
            backgroundSize: '100% 100%',
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
          touchStartAct={touchStartAct}
          touchEndAct={touchEndAct}
          isPlaying={isPlaying}
          autoPoints={autoPoints}
        />
        <div class="guide_hand"></div>
      </>
    )
  }
})
