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