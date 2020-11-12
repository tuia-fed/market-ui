import { CSSProperties, PropType, ref } from 'vue'
import Background from './components/background'
import { createComponent } from './create'
import styles from './styles'
// import useRotate from './hooks'

export default createComponent({
  props: {
    backgroundStyle: {
      type: Object as PropType<CSSProperties>,
      default: () => ({})
    },
    cupStyle: {
      type: Object as PropType<CSSProperties>,
      default: () => ({})
    },
    coinStyle: {
      type: Object as PropType<CSSProperties>,
      default: () => ({})
    },
    interval: {
      type: Number,
      default: 1
    },
    times: {
      type: Number,
      default: 1
    },
    afterEnd: {
      type: Function,
      default: () => {return {}}
    }
  },
  setup(props) {
    const interval = props.interval || 0.5
    const times = props.times || 20
    const cupStyle: CSSProperties = {
      ...props.cupStyle
    }
    const centerToRight: CSSProperties = {
      animation: `center_to_right ${interval}s 1 linear`
    }
    const rightToCenter: CSSProperties = {
      animation: `right_to_center ${interval}s 1 linear`
    }
    const centerToLeft: CSSProperties = {
      animation: `center_to_left ${interval}s 1 linear`
    }
    const leftToCenter: CSSProperties = {
      animation: `left_to_center ${interval}s 1 linear`
    }
    let style

    const list = ref([0, 1, 2])

    const direction = ref('')

    const cupNumber = ref(-1)

    const delay = async (t: number) => {
      return new Promise(resolve => {
        setTimeout(resolve, t)
      })
    }
    const move = async () => {
      if (Math.round(Math.random())) {
        direction.value = 'right'
        list.value[1] = [list.value[2], (list.value[2] = list.value[1])][0]
      } else {
        direction.value = 'left'
        list.value[1] = [list.value[0], (list.value[0] = list.value[1])][0]
      }
      await delay(interval * 1000).then(() => {
        direction.value = ''
      })
    }

    const onClick = async () => {
      if (cupNumber.value !== -1) return
      cupNumber.value = list.value.indexOf(1)
      await delay(2000)
      for (let i = 0; i < times; i++) {
        await move()

        await delay(100)
      }
      cupNumber.value = -1
    }
    const cupClick = (index: number, i: number) => {
      if (cupNumber.value !== -1) return
      cupNumber.value = index
      delay(2000).then(() => {
        cupNumber.value = -1
      })
      props.afterEnd(i === 1)
    }

    return () => (
      <Background style={props.backgroundStyle}>
        <button onClick={onClick}>开始</button>
        {list.value.map((i, index) => {
          const item = `item${index + 1}`
          if (direction.value === 'right') {
            style =
              index === 1
                ? { ...centerToRight }
                : index === 2
                ? { ...rightToCenter }
                : {}
          } else if (direction.value === 'left') {
            style =
              index === 1
                ? { ...centerToLeft }
                : index === 0
                ? { ...leftToCenter }
                : {}
          } else {
            style = {}
          }

          return (
            <div class={styles[item]} style={style}>
              <div
                style={cupStyle}
                class={[
                  styles.cup,
                  index === cupNumber.value ? styles.cupMove : ''
                ]}
                onClick={(e: MouseEvent) => {
                  cupClick(index, i)
                }}
              ></div>
              {i === 1 && (
                <div style={props.coinStyle} class={styles.coin}></div>
              )}
            </div>
          )
        })}
      </Background>
    )
  }
})
