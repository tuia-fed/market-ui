import { defineComponent, CSSProperties, PropType } from 'vue'
import styles from '../../styles'
import { noop } from '../../../../shared/utils'
import { CardClick } from '../../../types'

export default defineComponent({
  name: 'WheelStart',

  props: {
    width: {
      type: Number,
      default: 200
    },
    height: {
      type: Number,
      default: 288
    },
    onClick: {
      type: Function as PropType<CardClick>,
      default: noop
    },
    style: {
      type: Object as PropType<CSSProperties>,
      default: () => ({})
    },
    turn: {
      type: Boolean,
      default: false
    }
  },

  setup(props, { emit }) {
    const CardStyle: CSSProperties = {
      width: `${props.width}px`,
      height: `${props.height}px`,
      ...props.style
    }

    const onClick = (e: MouseEvent) => {
      emit('click', e)
    }

    return () => (
      <div
        onClick={onClick}
        style={CardStyle}
        class={[styles.card, props.turn ? styles.cardAni : '']}
      />
    )
  }
})
