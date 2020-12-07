## 基本使用

```javascript
import { CSSProperties, defineComponent, ref } from 'vue'
import RotationContainer from 'packages/rotation'
import { fetchData } from '@/shared/utils'
import './index.less'

export default defineComponent({
  name: 'RotationDemo',

  setup() {
    const singleList = [
      {
        image:
          '//yun.tuisnake.com/h5-mami/dist/item1.84574200c69f49c151a53126b534227c.png'
      },
      {
        image:
          '//yun.tuisnake.com/h5-mami/dist/item7.dbbecfdbafca57d3d193809269a87bc2.png'
      },
      {
        image:
          '//yun.tuisnake.com/h5-mami/dist/item6.78b4b54eedbf3b1431a174716b448929.png'
      },
      {
        image:
          '//yun.tuisnake.com/h5-mami/dist/item2.ccc21bbd9aea52fbbe28942ef371e0a1.png'
      },
      {
        image: '//yun.tuisnake.com/mami-media/img/95ed6c20-y3h2swcaon.png'
      },
      {
        image:
          '//yun.tuisnake.com/h5-mami/dist/item4.66875fb5074404008a1d408ed0167b60.png'
      },
      {
        image:
          '//yun.tuisnake.com/h5-mami/dist/item5.011718b84ce43874b7d18dbbe9c4f649.png'
      }
    ]

    const singleWidth = ref(180 * 0.5)
    const singleHeight = ref(180 * 0.5)
    const singleMargin = ref(20 * 0.5)
    const hideBoxWidth = ref(602 * 0.5)
    const hideBoxHeight = ref(300 * 0.5)
    const duration = ref(6000)

    const hideBoxStyle: CSSProperties = {
      width: hideBoxWidth.value + 'px',
      height: hideBoxHeight .value+ 'px'
    }

    const prizeItemStyle:CSSProperties = {
      width: singleWidth.value + 'px',
      height: singleHeight.value+ 'px',
      marginRight: singleMargin.value + 'px'
    }

    const rotationData = {
      singleWidth: singleWidth.value,
      singleMargin: singleMargin.value,
      hideBoxWidth: hideBoxWidth.value,
      singleList
    }

    const [angle, rotation] = RotationContainer.useRotation(rotationData)

    rotation.idled(duration.value)

    const onStart = () => {
      rotation.start()
      fetchData().then(() => {
        rotation.stop(
          {
            index: 1,
            duration: 1000,
            complete: () => {
              console.log('end')
              setTimeout(() => {
                rotation.reset(duration.value)
              }, 2000)
            }
          },
          false
        )
      })
    }

    return () => (
      <div class="demo-container">
        <RotationContainer
          prizeItemStyle={prizeItemStyle}
          singleList={singleList}
          hideBoxStyle={hideBoxStyle}
          duration={duration.value}
          angle={angle.value}
        ></RotationContainer>
        <div onClick={onStart} class="demo-btn">
          start
        </div>
      </div>
    )
  }
})
```

## Hooks

```javascript
import { RotationContainer } from 'market-ui'

const rotationData = {
  // 单个奖项宽度
  singleWidth: singleWidth.value,
  // 单个奖项高度
  singleMargin: singleMargin.value,
  // 隐藏区域宽度
  hideBoxWidth: hideBoxWidth.value,
  // 奖项列表
  singleList
}

const [angle, rotation] = RotationContainer.useRotate(rotationData)

// angle 作为摇奖机的奖品的移动位置，是一个 Ref

// 闲置旋转
rotation.idled(duration)
// 开始加速
rotation.start()
// 开始减速
rotation.stop({
  index: 0, // 停止位置
  complete () {

  }, // 停止回调
})
// 重置
rotation.reset()
```

## Props

|  参数   | 说明  |  类型   | 默认值 |
|  ----  | ----  |  ----  | ----  |
| angle  | 移动位置 | Number  | 0 |
| prizeItemStyle  | 奖品样式 | CSSProperties  | {} |
| hideBoxStyle  | 隐藏区域样式 | CSSProperties  | {} |
| duration  | 初始化动画轮询速率 | Number  | 3000 |
| singleList  | 奖品列表 | Array<RotationOptions>  | required |

## Events

|  事件名   | 说明  |  回调参数  | 
|  ----  | ----  |  ----  |
