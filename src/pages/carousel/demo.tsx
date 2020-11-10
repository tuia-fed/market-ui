import { CSSProperties, defineComponent, ref } from 'vue'
import Carousel from 'packages/carousel'
import { fetchData } from '@/shared/utils'
import btnImage from '@/assets/btnImage.png'
import packetImage from '@/assets/packet.png'

const options = Array.from({ length: 6 })
  .map((_, index) => index)
  .map(i => ({
    index: i,
    image: packetImage
  }))

export default defineComponent({
  name: 'Carousel',

  setup() {
    const splitNum = ref(6)

    const radius = ref(270)

    const disabled = ref(false)

    const [angle, rotate] = Carousel.useRotate(0, splitNum.value, true)

    rotate.idled()

    const onStart = () => {
      if (disabled.value) {
        return
      }

      disabled.value = true

      rotate.start()
      fetchData().then(() => {
        rotate.to({
          index: Math.floor(Math.random() * splitNum.value),
          complete() {
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
      textAlign: 'center',
      backgroundSize: '100%',
      backgroundImage: `url(${packetImage})`
    }

    const startStyle: CSSProperties = {
      width: '100px',
      height: '100px',
      backgroundSize: '100%',
      backgroundImage: `url(${btnImage})`
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
        ></Carousel>

        <div onClick={onStart} style={startStyle}></div>
      </>
    )
  }
})
