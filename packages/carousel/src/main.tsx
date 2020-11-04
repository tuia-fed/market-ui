import { CSSProperties, PropType } from 'vue'
import { CarouselStartClick } from '../types'
import Container from './components/container'
import Start from './components/start'
import { noop } from 'packages/shared/utils'
import { createComponent } from './create'

export default createComponent({
  Container,
  Start,

  props: {
    onStart: {
      type: Function as PropType<CarouselStartClick>,
      default: noop
    },

    startStyle: {
      type: Object as PropType<CSSProperties>,
      default: () => ({})
    },

    cardNum: {
      type: Number,
      default: 6
    },

    cardStyle: {
      type: Object as PropType<CSSProperties>,
      default: () => ({})
    }
  },

  setup(props) {
    return () => (
      <>
        <Container
          cardNum={props.cardNum}
          cardStyle={props.cardStyle}
        ></Container>

        <Start style={props.startStyle} onClick={props.onStart}></Start>
      </>
    )
  }
})
