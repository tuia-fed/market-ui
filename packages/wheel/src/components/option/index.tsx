import { defineComponent, PropType, FunctionalComponent, computed } from 'vue'
import styles from '../../styles'
import { WheelOption, WheelOptionClick } from '../../../types'

export default defineComponent({
  props: {
    option: {
      type: Object as PropType<WheelOption>,
      default: () => ({
        title: ''
      })
    },
    size: {
      type: Number,
      default: 150
    },
    index: {
      type: Number,
      required: true
    },
    onClick: {
      type: Function as PropType<WheelOptionClick>,
      required: true
    },
    render: {
      type: Function as PropType<FunctionalComponent>,
      required: true
    }
  },

  setup(props, ctx) {
    const OptionStyle = computed(() => ({
      width: `${props.size}px`,
      height: `${props.size}px`,
      transform: `rotate(${-15 + props.index * 60}deg) skew(15deg, 15deg)`
    }))

    const OptionRevertStyle = computed(() => ({
      width: `${props.size * 0.5}px`,
      height: `${props.size * 0.5}px`,
      transform: `translate(-25%, -25%) skew(-15deg, -15deg) rotate(-45deg)`
    }))

    const onClick = (e: MouseEvent) => {
      ctx.emit('click', e, props.index)
    }

    return () => (
      <div onClick={onClick} style={OptionStyle.value} class={styles.option}>
        <div style={OptionRevertStyle.value} class={styles.optionRevert}>
          {props.render(props.option, ctx)}
        </div>
      </div>
    )
  }
})
