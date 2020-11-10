import { CSSProperties, defineComponent, ref } from 'vue'
import Carousel from 'packages/carousel'
import { fetchData } from '@/shared/utils'

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

    const cardStyle: CSSProperties = {
      width: '307px',
      height: '361px',
      backgroundImage: `url('//yun.tuisnake.com/tact/RedPackSurrounded/fda523e8764bd6fdcd44431b8b34e220.png')`
    }

    return () => (
      <>
        <Carousel
          angle={angle.value}
          splitNum={splitNum.value}
          radius={radius.value}
          containerStyle={containerStyle}
          cardStyle={cardStyle}
        ></Carousel>

        <button onClick={onStart}>Start</button>
      </>
    )
  }
})
