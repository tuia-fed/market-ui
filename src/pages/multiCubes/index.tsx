import { CSSProperties, defineComponent, ref, Component } from 'vue'
import MultiCubes, { MultiCubesOption } from 'packages/multiCubes'
import { fetchData } from '@/shared/utils'
import optionImage from '@/assets/smile.png'
import Preview from '@/components/preview'
import Code from './README.md'
import './index.less'
const options = Array.from({ length: 50 })
  .map((_, index) => index)
  .map(item => ({
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

    return () => (
      <>
        <Code />
        <Preview>
          <div
            class="game-area"
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
                <p>
                  <b>抽奖</b>
                </p>
                <p>消耗10积分</p>
              </div>
            </div>
          </div>
        </Preview>
      </>
    )
  }
})
