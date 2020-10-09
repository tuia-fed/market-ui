import { computed, CSSProperties, defineComponent, PropType } from 'vue'

import styles from '../../styles'


export default defineComponent({
  name: 'WheelCircle',

  props: {
    style: {
      type: Object as PropType<CSSProperties>,
      default: () => ({}),
    },
    angle: {
      type: Number,
      default: 0,
    },
  },

  setup(props, { slots }) {
    const CircleStyle = computed(() => (
      {
        transform: `rotate3d(0, 0, 1, ${props.angle}deg)`,
        ...props.style,
      }
    ))

    return () => (
      <div style={CircleStyle.value as CSSProperties} class={styles.circle}>
        {(slots.default as Function)()}
      </div>
    )
  },
})
