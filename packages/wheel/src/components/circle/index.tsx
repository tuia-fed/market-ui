import { computed, CSSProperties, defineComponent, PropType } from 'vue'

import styles from '../../styles'

export default defineComponent({
  props: {
    style: {
      type: Object as PropType<CSSProperties>,
      default: () => ({})
    },
    angle: {
      type: Number,
      default: 0
    }
  },

  setup(props, ctx) {
    const circleStyle = computed(() => ({
      transform: `rotate3d(0, 0, 1, ${props.angle}deg)`,
      ...props.style
    }))

    return () => (
      <div style={circleStyle.value} class={styles.circle}>
        {(ctx.slots.default as Function)()}
      </div>
    )
  }
})
