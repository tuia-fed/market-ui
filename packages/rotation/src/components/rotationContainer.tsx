import { CSSProperties, defineComponent, PropType, computed } from 'vue'
import RotationSingle from './single'

import styles from '../styles'
import { RotationOptions } from '../../types'
import useRotation from '../hooks'

export default defineComponent({
  RotationSingle,
  useRotation,

  name: 'rotationContainer',

  props: {
    prizeItemStyle: {
      type: Object as PropType<CSSProperties>,
      default: {}
    },
    hideBoxStyle: {
      type: Object as PropType<CSSProperties>,
      default: {}
    },
    prizeList: {
      type: Array as PropType<RotationOptions>,
      default: () => []
    },
    angle: {
      type: Number,
      default: 0
    },
    duration: {
      type: Number,
      default: 3000
    }
  },

  setup(props) {
    const priceCellStyle = computed(() => {
      const result: CSSProperties = {}
      result.transform = `translate(${props.angle}px, 0)`
      return result
    })

    const renderItem = () => {
      return props.prizeList.map(item => (
        <RotationSingle
          option={item}
          style={props.prizeItemStyle}
        ></RotationSingle>
      ))
    }

    return () => (
      <div style={props.hideBoxStyle} class={styles['hide-box']}>
        <div style={priceCellStyle.value} class={styles['price-cell-copy']}>
          {
            renderItem()
          }
        </div>
        <div style={priceCellStyle.value} class={styles['price-cell']}>
          {
            renderItem()
          }
        </div>
      </div>
    )
  }
})
