import {
  defineComponent,
  CSSProperties,
  FunctionalComponent,
  PropType,
  ref
} from 'vue'
import styles from '../../styles'
import { noop } from '../../../../shared/utils'
import { CardClick, CardOption } from '../../../types'

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
      type: Function as PropType<CardClick>,
      default: noop
    },
    render: {
      type: Function as PropType<FunctionalComponent>,
      required: true
    }
  },

  setup(props, ctx) {
    const CardStyle: CSSProperties = {
      width: `${props.width}px`,
      height: `${props.height}px`,
      backgroundImage: `url(${props.option.cardImg})`
    }

    const CardBackStyle: CSSProperties = {
      width: `${props.width}px`,
      height: `${props.height}px`,
      backgroundImage: `url(${props.option.backImg})`
    }

    const onClick = (e: MouseEvent) => {
      ctx.emit('click', e, props.index)
    }

    return () => (
      <div class={styles.cardBox}>
        <div
          onClick={onClick}
          style={CardStyle}
          class={[
            styles.card,
            props.option.turn ? styles.cardAni : ''
          ]}
        />
        <div
          onClick={onClick}
          style={CardBackStyle}
          class={[styles.cardBack, props.option.turn ? styles.cardBackAni : '']}
        >
          {props.render(props.option, ctx)}
        </div>
      </div>
    )
  }
})
