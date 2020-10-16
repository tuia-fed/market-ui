import { CSSProperties, PropType } from 'vue'
import Background from './components/background'
import Circle from './components/circle'
import Option from './components/option'
import Start from './components/start'
import { noop } from '../../shared/utils'
import { WheelOptions, WheelOptionClick, WheelStartClick } from '../types'
import { createComponent } from './create'

export default createComponent({
  Background,
  Circle,
  Option,
  Start,

  props: {
    size: {
      type: Number,
      default: 300
    },
    angle: {
      type: Number,
      default: 0
    },
    backgroundStyle: {
      type: Object as PropType<CSSProperties>,
      default: () => ({})
    },
    circleStyle: {
      type: Object as PropType<CSSProperties>,
      default: () => ({})
    },
    startStyle: {
      type: Object as PropType<CSSProperties>,
      default: () => ({})
    },
    titleStyle: {
      type: Object as PropType<CSSProperties>,
      default: () => ({})
    },
    imageStyle: {
      type: Object as PropType<CSSProperties>,
      default: () => ({})
    },
    options: {
      type: Array as PropType<WheelOptions>,
      default: () => []
    },
    onOptionClick: {
      type: Function as PropType<WheelOptionClick>,
      default: noop
    },
    onStart: {
      type: Function as PropType<WheelStartClick>,
      default: noop
    }
  },

  setup(props) {
    return () => (
      <Background size={props.size} style={props.backgroundStyle}>
        <Circle style={props.circleStyle} angle={props.angle}>
          {props.options.map((item, i) => (
            <Option
              onClick={props.onOptionClick}
              index={i}
              size={props.size / 2}
              option={item}
              titleStyle={props.titleStyle}
              imageStyle={props.imageStyle}
            />
          ))}
        </Circle>
        <Start
          onClick={props.onStart}
          style={props.startStyle}
          size={props.size / 4}
        />
      </Background>
    )
  }
})
