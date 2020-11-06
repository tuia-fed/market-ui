import { RotationOption } from 'packages/rotation/types'
import { CSSProperties, defineComponent, PropType } from 'vue'

import styles from '../styles'

export default defineComponent({
  name: 'rotationSingle',

  props: {
    option: {
      type: Object as PropType<RotationOption>,
      default: () => ({})
    },
    style: {
      type: Object as PropType<CSSProperties>,
      default: () => ({})
    }
  },

  setup(props) {
    const singleStyle: CSSProperties = {
      backgroundImage: `url(${props.option.image})`,
      ...props.style
    }

    return () => <div style={singleStyle} class={styles.single}></div>
  }
})
