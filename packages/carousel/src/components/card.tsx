import { CSSProperties, defineComponent, PropType } from 'vue'
import styles from './styles.module.less'

export default defineComponent({
  name: 'Card',

  props: {
    index: {
      type: Number,
      required: true
    },

    rotateY: {
      type: Number,
      default: 0
    },

    radius: {
      type: Number,
      default: 0
    },

    style: {
      type: Object as PropType<CSSProperties>,
      default: () => ({})
    }
  },

  setup(props) {
    const defaultStyle: CSSProperties = {
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: `translate(-50%, -50%) rotateY(${props.rotateY}deg) translateZ(${props.radius}px)`,
      ...props.style
    }

    return () => (
      <div style={defaultStyle} class={styles.card}>
        {props.index}
      </div>
    )
  }
})
