import { CardTouchFunction } from 'packages/carousel/types'
import { CSSProperties, defineComponent, PropType } from 'vue'
import styles from './styles.module.less'

export default defineComponent({
  name: 'Card',

  props: {
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
    return () => (
      <div
        style={props.style}
        class={styles.card}
        onTouchstart={props.onTouchstart}
        onTouchmove={props.onTouchmove}
        onTouchend={props.onTouchend}
      ></div>
    )
  }
})
