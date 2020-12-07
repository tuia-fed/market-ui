# Usage

```javascript
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
```

# Hooks

```javascript
import { Wheel } from 'market-ui'

const [angle, rotate] = Carousel.useRotate(0, 6, true)

// angle 作为转盘的旋转角度，是一个 Ref

// 闲置旋转
rotate.idled()
// 开始加速
rotate.start()
// 减速停到某一个位置
rotate.to({
  index: 0, // 下标
  complete () {} // 停止回调
})
```

## Props

|  参数   | 说明  |  类型   | 默认值 |
|  ----  | ----  |  ----  | ----  |
| angle  | 旋转角度 | Number  | 0 |
| splitNum  | 切分数 | Number  | 6 等分 |
| radius  | 围绕圆的半径 | Number  | 0 |
| containerStyle  | 转盘样式 | CSSProperties  | {} 可以设置转盘的背景图片颜色等 |
| options  | 奖项 | Array<CarouselOption>  | required |
| optionStyle  | 奖项样式 | CSSProperties  | {} 可以设置奖项图片等 |
| optionRender  | 奖项 | FunctionalComponent  | OptionRender |
| optionOnClick | 点击奖项回调 | CarouselOptionOnClick | noop |