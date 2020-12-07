import { CSSProperties, PropType, computed } from 'vue'
import Background from './components/background'
import { createComponent } from './create'
import styles from './styles'
import useTurn from './hooks'

export default createComponent({
  useTurn,

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
    list: {
      type: Array,
      default: []
    },
    interval: {
      type: Number,
      default: 0.5
    },
    direction: {
      type: String,
      default: ''
    },
    cupNumber: {
      type: Number,
      default: -1
    },
    onCupClick: {
      type: Function,
      default: () => {
        return {}
      }
    }
  },
  setup(props) {
    const cupStyle: CSSProperties = {
      ...props.cupStyle
    }

    const centerToRight = computed(() => ({
      animation: `center_to_right ${props.interval}s 1 linear`
    }))
    const rightToCenter = computed(() => ({
      animation: `right_to_center ${props.interval}s 1 linear`
    }))
    const centerToLeft = computed(() => ({
      animation: `center_to_left ${props.interval}s 1 linear`
    }))
    const leftToCenter = computed(() => ({
      animation: `left_to_center ${props.interval}s 1 linear`
    }))
    let style

    const list = computed(() => {
      return props.list
    })

    const direction = computed(() => {
      return props.direction
    })

    const cupNumber = computed(() => {
      return props.cupNumber
    })

    return () => (
      <Background style={props.backgroundStyle}>
        {list.value.map((i, index) => {
          const item = `item${index + 1}`
          if (direction.value === 'right') {
            style =
              index === 1
                ? centerToRight.value
                : index === 2
                ? rightToCenter.value
                : {}
          } else if (direction.value === 'left') {
            style =
              index === 1
                ? centerToLeft.value
                : index === 0
                ? leftToCenter.value
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
                onClick={function() {
                  props.cupClick(index, i === 1)
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
