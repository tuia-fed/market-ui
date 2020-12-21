## Usage

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

## Hooks

```javascript
import { Wheel } from 'market-ui'

const [angle, rotate] = Wheel.useRotate(0)

// angle 作为转盘的旋转角度，是一个 Ref

// 闲置旋转
rotate.idled()
// 开始加速
rotate.start()
// 开始减速
rotate.to({
  index: 0, // 下标
  complete () {

  }, // 停止回调
})
```

## Props

|  参数   | 说明  |  类型   | 默认值 |
|  ----  | ----  |  ----  | ----  |
| angle  | 旋转角度 | Number  | 0 |
| size  | 转盘大小 | Number  | 0 自动获取父级宽度作为size） |
| style  | 转盘样式 | CSSProperties  | {} 可以设置转盘的背景图片颜色等 |
| options  | 转盘奖项 | Array<WheelOption>  | required |

## Events

|  事件名   | 说明  |  回调参数  | 
|  ----  | ----  |  ----  |
| onOptionClick  | 每个奖项点击的回调 | 事件对象 e: Event , 奖项下标 i: Number |
