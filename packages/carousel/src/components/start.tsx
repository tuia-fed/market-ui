import { defineComponent, CSSProperties, PropType } from 'vue'
import { CarouselStartClick } from '../../types'
import { noop } from 'packages/shared/utils'
import styles from './styles.module.less'

export default defineComponent({
  name: 'Start',

  props: {
    style: {
      type: Object as PropType<CSSProperties>,
      default: () => ({})
    },

    onClick: {
      type: Function as PropType<CarouselStartClick>,
      default: noop
    }
  },

  setup(props, { emit }) {
    const onClick = (e: MouseEvent) => {
      emit('click', e)
    }

    return () => (
      <div onClick={onClick} style={props.style} class={styles.start}>
        Start
      </div>
    )
  }
})
