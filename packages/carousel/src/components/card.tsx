import { CardTouchFunction } from 'packages/carousel/types'
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
    },

    onTouchstart: {
      type: Function as PropType<CardTouchFunction>
    },

    onTouchmove: {
      type: Function as PropType<CardTouchFunction>
    },

    onTouchend: {
      type: Function as PropType<CardTouchFunction>
    }
  },

  setup(props) {
    const defaultStyle: CSSProperties = {
      position: 'absolute',
      left: '50%',
      transform: `translate(-50%, -50%) rotateY(${props.rotateY}deg) translateZ(${props.radius}px)`,
      ...props.style
    }

    return () => (
      <div
        style={defaultStyle}
        class={styles.card}
        onTouchstart={props.onTouchstart}
        onTouchmove={props.onTouchmove}
        onTouchend={props.onTouchend}
      >
        {props.index}
      </div>
    )
  }
})
