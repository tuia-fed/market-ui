## 大转盘

```javascript
import { CSSProperties, defineComponent, ref } from 'vue'
import Wheel from 'packages/wheel'
import { fetchData } from '@/shared/utils'
import optionImage from '@/assets/smile.png'
import bgImage from '@/assets/bgImage.png'
import btnImage from '@/assets/btnImage.png'

const options = [0, 1, 2, 3, 4, 5].map(item => ({
  title: `谢谢参与${item}`,
  image: optionImage
}))

export default defineComponent({
  name: 'WheelDemo',

  setup() {
    const backgroundStyle: CSSProperties = {
      backgroundColor: '#fff'
    }

    const CircleStyle: CSSProperties = {
      backgroundImage: `url(${bgImage})`
    }

    const StartStyle: CSSProperties = {
      backgroundImage: `url(${btnImage})`
    }

    const size = ref(300)

    const disabled = ref(false)

    const [angle, rotate] = Wheel.useRotate(0)

    const onOptionClick = (e: MouseEvent, i: number) => {
      console.debug(e, i)
    }

    rotate.idled()

    const onStart = () => {
      if (disabled.value) return
      disabled.value = true

      rotate.start()
      fetchData().then(() => {
        rotate.to({
          index: Math.floor(Math.random() * 5),
          complete() {
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
        <Wheel
          size={size.value}
          angle={angle.value}
          backgroundStyle={backgroundStyle}
          circleStyle={CircleStyle}
          startStyle={StartStyle}
          options={options}
          onOptionClick={onOptionClick}
          onStart={onStart}
        />
      </>
    )
  }
})

```

|  表头   | 表头  |
|  ----  | ----  |
| 单元格  | 单元格 |
| 单元格  | 单元格 |