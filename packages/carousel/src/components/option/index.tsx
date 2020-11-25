import {
  CSSProperties,
  defineComponent,
  FunctionalComponent,
  PropType
} from 'vue'
import { CarouselOption, CarouselOptionOnClick } from 'packages/carousel/types'
import stylesClass from '../../styles'

export default defineComponent({
  name: 'Option',

  props: {
    /**
     * 索引序号
     */
    index: {
      type: Number,
      required: true
    },

    /**
     * 绕圆心旋转的角度
     */
    rotateY: {
      type: Number,
      default: 0
    },

    /**
     * 半径
     */
    radius: {
      type: Number,
      default: 0
    },

    /**
     * 样式
     */
    style: {
      type: Object as PropType<CSSProperties>,
      default: () => ({})
    },

    /**
     * 每项的配置数据
     */
    option: {
      type: Object as PropType<CarouselOption>,
      default: () => ({})
    },

    /**
     * 每项的渲染函数
     */
    render: {
      type: Function as PropType<FunctionalComponent>,
      required: true
    },

    /**
     * 点击事件
     */
    onClick: {
      type: Function as PropType<CarouselOptionOnClick>
    }
  },

  setup(props, ctx) {
    const defaultStyle: CSSProperties = {
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: `translate(-50%, -50%) rotateY(${props.rotateY}deg) translateZ(${props.radius}px)`,
      ...props.style
    }

    const onClick = (e: MouseEvent) => {
      ctx.emit('click', e, props.index)
    }

    return () => (
      <div onClick={onClick} style={defaultStyle} class={stylesClass.option}>
        {props.render(props.option, ctx)}
      </div>
    )
  }
})
