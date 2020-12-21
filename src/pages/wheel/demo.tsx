import { CSSProperties, defineComponent, getCurrentInstance, ref } from 'vue'
import Wheel from 'packages/wheel'
import { fetchData } from '@/shared/utils'
import optionImage from '@/assets/smile.png'
import bgImage from '@/assets/bgImage.png'
import btnImage from '@/assets/btnImage.png'

const options = Array.from({ length: 6 })
  .map((_, index) => index)
  .map(item => ({
    title: `奖项名称${item}`,
    image: optionImage
  }))
export default defineComponent({
  name: 'WheelDemo',

  setup() {
    const circleStyle: CSSProperties = {
      backgroundImage: `url(${bgImage})`
    }

    const size = ref(300)

    const disabled = ref(false)

    const [angle, rotate] = Wheel.useRotate(0)

    const internalInstance = getCurrentInstance()

    const onOptionClick = (e: MouseEvent, i: number) => {
      internalInstance?.appContext.config.globalProperties.$toast(
        'Click on' + i
      )
    }

    rotate.idled()

    const onStart = () => {
      if (disabled.value) return
      disabled.value = true

      rotate.start()
      fetchData().then(() => {
        const index = Math.floor(Math.random() * 5)
        rotate.to({
          index,
          complete() {
            internalInstance?.appContext.config.globalProperties.$toast(
              'Lucky you with ' + index
            )

            setTimeout(() => {
              disabled.value = false
              rotate.idled()
            }, 1000)
          }
        })
      })
    }

    return () => (
      <>
        <div
          style={{
            position: 'relative',
            width: size.value + 'px',
            height: size.value + 'px'
          }}
        >
          <Wheel
            angle={angle.value}
            style={circleStyle}
            options={options}
            onOptionClick={onOptionClick}
          />
          <div
            onClick={onStart}
            style={{
              position: 'absolute',
              width: size.value / 4 + 'px',
              height: size.value / 4 + 'px',
              left: (size.value / 8) * 3 + 'px',
              top: (size.value / 8) * 3 + 'px',
              backgroundImage: `url(${btnImage})`,
              backgroundSize: '100% 100%',
              borderRadius: '50%'
            }}
          ></div>
        </div>
      </>
    )
  }
})
