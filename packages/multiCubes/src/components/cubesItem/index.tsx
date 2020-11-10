import { defineComponent, PropType, FunctionalComponent } from 'vue'
import styles from '../../styles'
import { MultiCubesOption, MultiCubesItemClick } from '../../../types'

export default defineComponent({
  props: {
    option: {
      type: Object as PropType<MultiCubesOption>,
      default: () => ({
        title: ''
      })
    },
    // 当前index
    index: {
      type: Number,
      required: true
    },
    // 高亮index
    activeIndex:{
      type: Number,
      required: true 
    },
    // 宫格项尺寸
    cubeSize:{
      type: Number,
      required: true 
    },
    onClick: {
      type: Function as PropType<MultiCubesItemClick>,
      required: true
    },
    render: {
      type: Function as PropType<FunctionalComponent>,
      required: true
    }
  },

  setup(props, ctx) {

    const onClick = (e: MouseEvent) => {
      ctx.emit('click', e, props.index)
    }

    return () => (
      <div onClick={onClick}
        class={styles.cubeItemWrap}
        style={{width: props.cubeSize + 'px', height: props.cubeSize + 'px'}}
      >
        {props.render({
          ...props.option,
          index: props.index,
          active: props.activeIndex * 1 === props.index
        }, ctx)}
      </div>
    )
  }
})
