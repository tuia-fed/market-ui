import { CSSProperties, defineComponent, PropType } from 'vue'

import styles from '../../styles'

export default defineComponent({
  name: 'WheelBackground',

  props: {
    size: {
      type: Number,
      default: 300,
    },
    style: {
      type: Object as PropType<CSSProperties>,
      default: () => ({}),
    },
  },

  setup(props, { slots }) {
    const BackgroundStyle: CSSProperties = {
      width: props.size + 'px',
      height: props.size + 'px',
      ...props.style,
    }

    return () => (
      <div style={BackgroundStyle} class={styles.background}>
        {(slots.default as Function)()}
      </div>
    )
  },
})
