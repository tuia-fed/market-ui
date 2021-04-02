import { defineComponent, PropType, computed } from 'vue'
import styles from '../../styles'
import { noop } from '../../../../shared/utils'
import { OnCardClick, CardOption } from 'types'

export default defineComponent({
  props: {
    option: {
      type: Object as PropType<CardOption>,
      default: () => ({
        cardImg: '',
        backImg: '',
        turn: false
      })
    },
    width: {
      type: Number,
      default: 200
    },
    height: {
      type: Number,
      default: 288
    },
    index: {
      type: Number,
      required: true
    },
    onClick: {
      type: Function as PropType<OnCardClick>,
      default: noop
    },
    activeName: {
      type: String
    }
  },

  setup(props, ctx) {
    const CardStyle = computed(() => ({
      width: `${props.width}px`,
      height: `${props.height}px`,
      backgroundImage: `url(${props.option.cardImg})`
    }))

    const CardBackStyle = computed(() => ({
      width: `${props.width}px`,
      height: `${props.height}px`,
      backgroundImage: `url(${props.option.backImg})`
    }))

    const onClick = (e: MouseEvent) => {
      ctx.emit('click', e, props.index)
    }

    return () => (
      <div class={[styles.cardWraper, props.activeName]}>
        <div
          onClick={onClick}
          style={CardStyle.value}
          class={[
            styles.cardFront,
            props.option.turn ? styles.frontTurnBack : ''
          ]}
        ></div>
        <div
          onClick={onClick}
          style={CardBackStyle.value}
          class={[
            styles.cardBack,
            props.option.turn ? styles.backTurnFront : ''
          ]}
        ></div>
      </div>
    )
  }
})
