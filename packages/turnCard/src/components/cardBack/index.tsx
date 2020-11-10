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
    backStyle: {
      type: Object as PropType<CSSProperties>,
      default: () => ({})
    },
    turn: {
      type: Boolean,
      default: false
    }
  },

  setup(props, { emit }) {
    const CardBackStyle: CSSProperties = {
      width: `${props.width}px`,
      height: `${props.height}px`,
      ...props.backStyle
    }

    // const onClick = (e: MouseEvent) => {
    //   emit('click', e)
    // }

    return () => (
      <div
        style={CardBackStyle}
        class={[styles.cardBack, props.turn ? styles.cardBackAni : '']}
      />
    )
  }
})
