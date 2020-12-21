## Usage

```javascript
import { defineComponent, ref, Component } from 'vue'
import MultiCubes, { MultiCubesOption } from 'packages/multiCubes'
import { fetchData } from '@/shared/utils'
import optionImage from '@/assets/smile.png'
import './index.less'
const options = Array.from({ length: 50 })
  .map((_, index) => index)
  .map(item => ({
    title: `奖品${item}`,
    image: optionImage
  }))

/**
 * 各宫格自定义的渲染函数
 * @param option
 */
function cubesItemRender(option: MultiCubesOption): Component {
  return (
    <div class="cube-item-wrap">
      <div class={`cube-item ${option.active ? 'active' : ''}`}>
        <p>
          <img src={option.image} />
        </p>
        <p>{option.title}</p>
      </div>
    </div>
  )
}

export default defineComponent({
  name: 'MultiCubesDemo',

  setup() {
    const size = ref(300)
    const rowNum = ref(3)

    const disabled = ref(false)

    const [activeIndex, rotate] = MultiCubes.useRotate({ rowNum: rowNum.value })
    const onOptionClick = (e: MouseEvent, i: number) => {
      console.log(i)
    }

    rotate.idled()

    const onStart = () => {
      if (disabled.value) return
      disabled.value = true

      rotate.start()
      fetchData().then(() => {
        const index = Math.floor(Math.random() * 8)
        console.log(index)
        rotate.stop({
          index,
          complete() {
            console.log('获得奖品' + index)
            setTimeout(() => {
              disabled.value = false
              rotate.idled()
            }, 2000)
          }
        })
      })
    }

    return () => (
      <div class="game-area">
        <div    
          style={{
            width: size.value + 'px',
            height: size.value + 'px'
          }}
        >
          <MultiCubes
            size={size.value}
            rowNum={rowNum.value}
            activeIndex={activeIndex.value}
            options={options}
            onItemClick={onOptionClick}
            itemRender={cubesItemRender}
          />
          <div class="start-btn" onClick={onStart}>
            抽奖
          </div>
        </div>
      </div>
    )
  }
})
```
## Hooks

```javascript
import { MultiCubes } from 'market-ui'

const rowNum = ref(3)

const [activeIndex , rotate] = MultiCubes.useRotate({rowNum: rowNum.value})

// activeIndex 作为当前高亮项，是一个 State

// 闲置旋转
rotate.idled()

// 开始抽奖转动
rotate.start()

// 停下转动
rotate.stop({
  index:0, // 最终停的位置的index值
  complete() {
    // 停止回调
  }
})
```

## Props

|  参数   | 说明  |  类型   | 默认值 |
|  ----  | ----  |  ----  | ----  |
| activeIndex  | 当前高亮项 | Number  | 起始值为0 , 变动范围为0至(宫格数 - 1)|
| size  | 宫格容器大小 | Number  | 0 自动获取父级宽度作为size） |
| options  | 宫格奖项 | Array<MultiCubesOption>  | required |
| rowNum  | 宫格每边奖项个数 | Array<MultiCubesOption>  | 默认为3，如传入的值小于3则也会取默认值3 |
| itemRender | 宫格项渲染函数 | (option:MultiCubesOption) => Component  | 不传则走默认渲染函数 |
| options  | 宫格奖项 | Array<MultiCubesOption>  | required |

## Events

|  事件名   | 说明  |  回调参数  | 
|  ----  | ----  |  ----  |
| onItemClick  | 每个奖项点击的回调 | 事件对象 e: Event , 奖项下标 i: Number |

