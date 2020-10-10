import { withModifiers, CSSProperties, defineComponent, reactive, ref } from 'vue'
import MyWheel, { Wheel, useRotate } from '@/components/wheel'

import optionImage from './assets/smile.png'
import bgImage from './assets/bgImage.png'
import btnImage from './assets/btnImage.png'

const options = [1, 2, 3, 4, 5, 6].map((item) => ({
  title: `谢谢参与${item}`,
  image: optionImage,
}))

export default defineComponent({
  name: 'App',

  setup() {
    const backgroundStyle: CSSProperties = {
      backgroundColor: '#f5f5f5'
    }

    const CircleStyle: CSSProperties = {
      backgroundImage: `url(${bgImage})`,
    }

    const StartStyle: CSSProperties = {
      backgroundImage: `url(${btnImage})`,
    }

    const titleStyle: CSSProperties = {
      fontSize: '13px'
    }

    const size = ref(300)

    const disabled = ref(false)

    const [angle, rotate] = useRotate(0)

    const onOptionClick = (e: MouseEvent, i: number) => {
      console.debug(e, i)
    }

    rotate.idled()

    const onStart = (e: MouseEvent) => {

      disabled.value = true

      rotate.start()
      setTimeout(() => {
        rotate.to({
          index: Math.floor(Math.random() * 5),
          complete() {
            setTimeout(() => {
              disabled.value = false
              rotate.idled()
            }, 1000)
          }
        })
      }, 1000)
    }

    

    return () => (
      <>
        <MyWheel
          disabled={disabled.value}
          size={size.value}
          angle={angle.value}
          backgroundStyle={backgroundStyle}
          circleStyle={CircleStyle}
          startStyle={StartStyle}
          options={options}
          onOptionClick={onOptionClick}
          onStart={onStart}
        />
        <Wheel.Background
          size={size.value}
          style={backgroundStyle}
        >
          <Wheel.Circle
            style={CircleStyle}
            angle={angle.value}
          >
            {
              options.map((opt, i) => (
                <Wheel.Option
                  titleStyle={titleStyle}
                  onClick={onOptionClick}
                  size={size.value / 2}
                  index={i}
                  option={opt}
                >
                </Wheel.Option>
              ))
            }
          </Wheel.Circle>
          <Wheel.Start
            onClick={onStart}
            style={StartStyle}
            size={size.value / 4}
          />
        </Wheel.Background>
      </>
    )
  },
})
