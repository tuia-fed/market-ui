import { defineComponent, CSSProperties, PropType } from 'vue'
import styles from '../../styles'
import { noop } from '@/shared/utils'
import { WheelStartClick } from '../../types'

export default defineComponent({
  name: 'WheelStart',

  props: {
    size: {
      type: Number,
      default: 75
    },
    onClick: {
      type: Function as PropType<WheelStartClick>,
      default: noop
    }
  },

  setup(props, { emit }) {
    const StartStyle: CSSProperties = {
      width: `${props.size}px`,
      height: `${props.size}px`
    }

    const onClick = (e: MouseEvent) => {
      emit('click', e)
    }

    return () => (
      <div onClick={onClick} style={StartStyle} class={styles.start}></div>
    )
  }
})
