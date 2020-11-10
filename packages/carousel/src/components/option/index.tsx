import { CSSProperties, defineComponent, FunctionalComponent, PropType } from 'vue'
import { CarouselOption } from 'packages/carousel/types'

export default defineComponent({
  name: 'Option',

  props: {
    index: {
      type: Number,
      required: true
    },

    rotateY: {
      type: Number,
      default: 0
    },

    radius: {
      type: Number,
      default: 0
    },

    style: {
      type: Object as PropType<CSSProperties>,
      default: () => ({})
    },

    option: {
      type: Object as PropType<CarouselOption>,
      default: () => ({})
    },

    render: {
      type: Function as PropType<FunctionalComponent>,
      required: true
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
    

    return () => (
      <div style={defaultStyle}>
        {props.render(props.option, ctx)}
      </div>
    )
  }
})
