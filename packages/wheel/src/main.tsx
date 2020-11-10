import {
  CSSProperties,
  PropType,
  FunctionalComponent,
  ref,
  computed
} from 'vue'
import Circle from './components/circle'
import Option from './components/option'
import OptionRenderFunction from './components/option/render'
import { noop } from '../../shared/utils'
import { WheelOptions, WheelOptionClick, WheelOption } from '../types'
import { createComponent } from './create'
import useRotate from './hooks'

export default createComponent({
  Circle,
  Option,
  useRotate,

  props: {
    // 旋转角度
    angle: {
      type: Number,
      default: 0
    },
    // 转盘大小，正方形
    size: {
      type: Number,
      default: 0
    },
    // 转盘样式
    style: {
      type: Object as PropType<CSSProperties>,
      default: () => ({})
    },
    // 转盘options
    options: {
      type: Array as PropType<WheelOptions>,
      required: true
    },
    // 点击option
    onOptionClick: {
      type: Function as PropType<WheelOptionClick>,
      default: noop
    },
    // 自定义option组件
    optionRender: {
      type: Function as PropType<FunctionalComponent>,
      default: (option: WheelOption) => <OptionRenderFunction {...option} />
    }
  },

  setup(props) {
    const autoSize = ref(props.size)

    const circleStyle = computed(() => ({
      width: (props.size || autoSize.value) + 'px',
      height: (props.size || autoSize.value) + 'px',
      ...props.style
    }))

    const myRef = (el: any) => {
      if (autoSize.value === 0) {
        const rect = el.$el.parentNode.getBoundingClientRect()
        autoSize.value = rect.width
      }
    }

    return () => (
      <Circle style={circleStyle.value} angle={props.angle} ref={myRef}>
        {props.options.map((item, i) => (
          <Option
            onClick={props.onOptionClick}
            index={i}
            size={props.size ? props.size / 2 : autoSize.value / 2}
            option={item}
            render={props.optionRender}
          />
        ))}
      </Circle>
    )
  }
})
