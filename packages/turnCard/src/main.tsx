import { CSSProperties, PropType } from 'vue'
import Card from './components/card'
import { noop } from '../../shared/utils'
import { CardClick } from '../types'
import { createComponent } from './create'

export default createComponent({
  Card,

  props: {
    width: {
      type: Number,
      default: 200
    },
    height: {
      type: Number,
      default: 288
    },
    backWidth: {
      type: Number,
      default: 200
    },
    backHeight: {
      type: Number,
      default: 288
    },
    cardStyle: {
      type: Object as PropType<CSSProperties>,
      default: () => ({})
    },
    cardBackStyle: {
      type: Object as PropType<CSSProperties>,
      default: () => ({})
    },
    onStart: {
      type: Function as PropType<CardClick>,
      default: noop
    },
    turn: {
      type: Boolean,
      default: false
    }
  },

  setup(props) {
    return () => (
      <Card
        turn={props.turn}
        onClick={props.onStart}
        style={props.cardStyle}
        backStyle={props.cardBackStyle}
        width={props.width}
        height={props.height}
        backWidth={props.backWidth}
        backHeight={props.backHeight}
      />
    )
  }
})
