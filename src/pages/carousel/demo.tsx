import { CSSProperties, defineComponent, ref, FunctionalComponent } from 'vue'
import Carousel, { CarouselOption } from 'packages/carousel'
import { fetchData } from '@/shared/utils'
import btnImage from '@/assets/btnImage.png'
import packetImage from '@/assets/packet.png'

// 构造每项数据
const options = Array.from({ length: 6 })
  .map((_, index) => index)
  .map(i => ({
    index: i,
    image: packetImage
  }))

export default defineComponent({
  name: 'Carousel',

  setup() {
    // 切分数量
    const splitNum = ref(6)
    // 半径
    const radius = ref(140)
    // 锁
    const disabled = ref(false)
    // 旋转函数
    const [angle, rotate] = Carousel.useRotate(0, splitNum.value, true)

    // 闲置旋转
    rotate.idled()

    const onStart = () => {
      // 防重锁
      if (disabled.value) {
        return
      }

      disabled.value = true

      rotate.start()
      fetchData().then(() => {
        rotate.to({
          index: Math.floor(Math.random() * splitNum.value), // 停在随机位置
          complete() {
            // 1s 后恢复闲置旋转
            setTimeout(() => {
              disabled.value = false
              rotate.idled()
            }, 1000)
          }
        })
      })
    }

    // 撑开一定空间
    const containerStyle: CSSProperties = {
      width: '375px',
      height: '240px'
    }

    // 开始按钮样式
    const startStyle: CSSProperties = {
      width: '80px',
      height: '80px',
      backgroundSize: 'cover',
      backgroundImage: `url(${btnImage})`
    }

    // 点击每一项时
    const onOptionClick = (e: MouseEvent, i: number) => {
      console.log('onOptionClick', i)
    }

    // 自定义渲染组件
    const optionRender: FunctionalComponent = (
      optionRender: CarouselOption
    ) => {
      return (
        <img
          src={optionRender.image}
          style={{ width: '153px', height: '180px' }}
        />
      )
    }

    return () => (
      <>
        <Carousel
          angle={angle.value}
          splitNum={splitNum.value}
          radius={radius.value}
          containerStyle={containerStyle}
          options={options}
          onOptionClick={onOptionClick}
          optionRender={optionRender}
        ></Carousel>

        <div onClick={onStart} style={startStyle}></div>
      </>
    )
  }
})
