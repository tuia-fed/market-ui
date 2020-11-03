## 大转盘

```javascript
import { CSSProperties, defineComponent, ref } from 'vue'
import { Wheel } from 'market-ui'
import { fetchData } from '@/shared/utils'
import optionImage from '@/assets/smile.png'
import bgImage from '@/assets/bgImage.png'

const options = [0, 1, 2, 3, 4, 5].map(item => ({
  title: `谢谢参与${item}`,
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

    const onOptionClick = (e: MouseEvent, i: number) => {
      console.log(i)
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
        <div
          style={{
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
        </div>
      </>
    )
  }
})


```

|  表头   | 表头  |
|  ----  | ----  |
| 单元格  | 单元格 |
| 单元格  | 单元格 |