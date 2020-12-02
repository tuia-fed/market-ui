import { CSSProperties, defineComponent, PropType } from 'vue'

import styles from '../../styles'

export default defineComponent({
  name: 'Background',

  props: {
    style: {
      type: Object as PropType<CSSProperties>,
      default: () => ({})
    }
  },

  setup(props, { slots }) {
    const BackgroundStyle: CSSProperties = {
      ...props.style
    }

    return () => (
      <div style={BackgroundStyle} class={styles.background}>
        {(slots.default as Function)()}
      </div>
    )
  }
})
