import { defineComponent, CSSProperties, PropType } from 'vue'
import styles from '../../styles'
import { noop } from '@/shared/utils'

export type WheelStartClick = () => void

export default defineComponent({
  name: 'WheelStart',

  props: {
    size: {
      type: Number,
      default: 75,
    },
    onClick: {
      type: Function as PropType<WheelStartClick>,
      default: noop,
    },
  },

  setup(props, { emit }) {
    const StartStyle: CSSProperties = {
      width: `${props.size}px`,
      height: `${props.size}px`,
    }

    function onClick() {
      emit('click')
    }

    return () => (
      <div onClick={onClick} style={StartStyle} class={styles.start}></div>
    )
  },
})
