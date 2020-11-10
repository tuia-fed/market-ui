import { computed, CSSProperties, PropType } from 'vue'
import { createComponent } from './create'
import Card from './components/card'
import styles from './components/styles.module.less'
import useRotate from './hooks'

function getAngleByIndex(index: number, splitNum: number) {
  return index * (360 / splitNum)
}

export default createComponent({
  useRotate,

  props: {
    angle: {
      type: Number,
      default: 0
    },

    splitNum: {
      type: Number,
      default: 6
    },

    radius: {
      type: Number,
      default: 0
    },

    containerStyle: {
      type: Object as PropType<CSSProperties>,
      default: () => ({})
    },

    cardStyle: {
      type: Object as PropType<CSSProperties>,
      default: () => ({})
    }
  },

  setup(props) {
    // 旋转中心的样式
    const centerStyle = computed(() => ({
      transform: `rotateY(${props.angle}deg)`
    }))

    const list = Array(props.splitNum).fill(undefined)

    return () => (
      <div class={styles.container} style={props.containerStyle}>
        <div class={styles.center} style={centerStyle.value}>
            {list.map((_, index) => (
              <Card
                index={index}
                rotateY={getAngleByIndex(index, props.splitNum)}
                radius={props.radius}
                style={props.cardStyle}
              ></Card>
            ))}
        </div>
      </div>
    )
  }
})
