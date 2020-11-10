## 基本使用

```javascript
import { CSSProperties, defineComponent, ref, Component } from 'vue'
import MultiCubes, { MultiCubesOption } from 'packages/multiCubes'
import { fetchData } from '@/shared/utils'
import optionImage from '@/assets/smile.png'
import './index.less'

const options = [0, 1, 2, 3, 4, 5, 6, 7, 8].map(item => ({
  title: `奖品${item}`,
  image: optionImage
}))

export default defineComponent({
  name: 'MultiCubesDemo',

  setup() {
    const containerStyle: CSSProperties = {}

    const size = ref(320)
    const rowNum = ref(3)

    const disabled = ref(false)

    const [activeIndex , rotate] = MultiCubes.useRotate({rowNum: rowNum.value })
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
            console.log('获得奖品'+ index)
            setTimeout(() => {
              disabled.value = false
              rotate.idled()
            }, 2000)
          }
        })
      })
    }

    function cubesItemRender(option:MultiCubesOption){
      return (
        <div class="cube-item-wrap">
          <div class={`cube-item ${option.active ? 'active':''}`}>
            <p><img src={option.image}/></p>
            <p>{option.title}</p>
          </div>
        </div>
      )
    }

    return () => (
      <>
        <div class="game-area"
          style={{
            width: size.value + 'px',
            height: size.value + 'px'
          }}
        >
          <div class="multi-cubes-wrap">
            <MultiCubes
              size={size.value}
              rowNum={rowNum.value}
              activeIndex={activeIndex.value}
              containerStyle={containerStyle}
              options={options}
              onMultiCubesItemClick={onOptionClick}
              cubesItemRender={cubesItemRender}
            />
            <div class="start-btn" onClick={onStart}>
              <p><b>抽奖</b></p>
              <p>消耗10积分</p>
            </div>
          </div>
         
        </div>
        <Code/>
      </>
    )
  }
})
```
```less
//./index.less
.game-area {
  animation: changeBg 0.5s ease infinite;
  overflow: hidden;
  margin: 0 auto;
  background-repeat: no-repeat;
  background-size: 100% 100%;
  padding: 20px 20px;
  position: relative;

  .multi-cubes-wrap {
    width: 100%;
    height: 100%;
  }

  .start-btn {
    background: url(../../assets/multiCubesItembg1.png) no-repeat center;
    background-size: 100% 100%;
    position: absolute;
    width: 106px;
    height: 106px;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -55%);

    p {
      font-size: 14px;
      color: #fff;
      cursor: pointer;
      text-align: center;
      overflow: hidden;
      margin: 0;

      b {
        font-size: 40px;
        margin-top: 24px;
        margin-bottom: 15px;
        line-height: 30px;
        display: block;
      }
    }
  }

  .cube-item-wrap {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;

    .cube-item {
      width: 98px;
      height: 98px;
      background: url(../../assets/multiCubesItembg2.png) no-repeat center;
      background-size: 100% 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;

      p {
        color: #708abf;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        font-size: 14px;
        margin: 0;

        img {
          margin-bottom: 6px;
          width: 40px;
          height: 40px;
        }
      }

      &.active {
        background: url(../../assets/multiCubesItembg1.png) no-repeat center;
        background-size: 100% 100%;

        p {
          color: #fff;
        }
      }
    }
  }
}

@keyframes changeBg {
  0% {
    background-image: url(../../assets/multiCubesBg1.png);
  }

  100% {
    background-image: url(../../assets/multiCubesBg2.png);
  }
}
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
| containerStyle  | 宫格容器样式 | CSSProperties  | {} 可设置容器背景图等 |
| options  | 宫格奖项 | Array<MultiCubesOption>  | required |
| rowNum  | 宫格每边奖项个数 | Array<MultiCubesOption>  | 默认为3，如传入的值小于3则也会取默认值3 |
| cubesItemRender  | 宫格项渲染函数 | (option:MultiCubesOption) => Component  | 不传则走默认渲染函数 |
| options  | 宫格奖项 | Array<MultiCubesOption>  | required |

## Events

|  事件名   | 说明  |  回调参数  | 
|  ----  | ----  |  ----  |
| onMultiCubesItemClick  | 每个奖项点击的回调 | 事件对象 e: Event , 奖项下标 i: Number |

