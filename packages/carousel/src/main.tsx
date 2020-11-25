import { computed, CSSProperties, FunctionalComponent, PropType } from 'vue'
import { createComponent } from './create'
import Option from './components/option/index'
import OptionRender from './components/option/render'
import stylesClass from './styles'
import useRotate from './hooks'
import {
  CarouselOption,
  CarouselOptions,
  CarouselOptionOnClick
} from '../types'

function getAngleByIndex(index: number, splitNum: number) {
  return index * (360 / splitNum)
}

export default createComponent({
  useRotate,

  props: {
    angle: {
      type: Number,
      default: 0
    },

    splitNum: {
      type: Number,
      default: 6
    },

    radius: {
      type: Number,
      default: 0
    },

    containerStyle: {
      type: Object as PropType<CSSProperties>,
      default: () => ({})
    },

    options: {
      type: Array as PropType<CarouselOptions>,
      required: true
    },

    optionStyle: {
      type: Object as PropType<CSSProperties>,
      default: () => ({})
    },

    optionRender: {
      type: Function as PropType<FunctionalComponent>,
      default: (option: CarouselOption) => <OptionRender {...option} />
    },

    /**
     * 点击每一项的事件
     */
    optionOnClick: {
      type: Function as PropType<CarouselOptionOnClick>,
      default: () => ({})
    }
  },

  setup(props) {
    // 旋转中心的样式
    const centerStyle = computed(() => ({
      transform: `rotateY(${props.angle}deg)`
    }))

    return () => (
      <div class={stylesClass.container} style={props.containerStyle}>
        <div class={stylesClass.center} style={centerStyle.value}>
          {props.options.map((item, index) => (
            <Option
              index={index}
              rotateY={getAngleByIndex(index, props.splitNum)}
              radius={props.radius}
              style={props.optionStyle}
              option={item}
              render={props.optionRender}
              onClick={props.optionOnClick}
            ></Option>
          ))}
        </div>
      </div>
    )
  }
})
