import { CSSProperties, defineComponent, ref } from 'vue'
import Carousel from 'packages/carousel'
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
    const radius = ref(270)
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

    const containerStyle: CSSProperties = {
      width: '620px',
      height: '500px'
    }

    const optionStyle: CSSProperties = {
      width: '307px',
      height: '361px',
      backgroundSize: '100%',
      backgroundImage: `url(${packetImage})`
    }

    const startStyle: CSSProperties = {
      width: '100px',
      height: '100px',
      backgroundSize: '100%',
      backgroundImage: `url(${btnImage})`
    }

    // 点击每一项时
    const onOptionClick = (e: MouseEvent, i: number) => {
      console.log('onOptionClick', i)
    }

    return () => (
      <>
        <Carousel
          angle={angle.value}
          splitNum={splitNum.value}
          radius={radius.value}
          containerStyle={containerStyle}
          optionStyle={optionStyle}
          options={options}
          onOptionClick={onOptionClick}
        ></Carousel>

        <div onClick={onStart} style={startStyle}></div>
      </>
    )
  }
})
