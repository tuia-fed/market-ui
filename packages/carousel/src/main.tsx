import { CSSProperties, PropType } from 'vue'
import { CarouselStartClick } from '../types'
import Container from './components/container'
import { noop } from 'packages/shared/utils'
import { createComponent } from './create'
import useRotate from './hooks'

export default createComponent({
  Container,
  useRotate,

  props: {
    angle: {
      type: Number,
      default: 0
    },

    startStyle: {
      type: Object as PropType<CSSProperties>,
      default: () => ({})
    },

    splitNum: {
      type: Number,
      default: 6
    },

    cardStyle: {
      type: Object as PropType<CSSProperties>,
      default: () => ({})
    },

    radius: {
      type: Number,
      default: 0
    }
  },

  setup(props) {
    return () => (
      <>
        <Container
          angle={props.angle}
          splitNum={props.splitNum}
          cardStyle={props.cardStyle}
          radius={props.radius}
        ></Container>
      </>
    )
  }
})
