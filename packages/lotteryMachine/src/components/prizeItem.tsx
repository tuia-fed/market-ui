import { lotteryMachineOption } from 'types'
import { CSSProperties, defineComponent, PropType } from 'vue'

import styles from '../styles'

export default defineComponent({
  name: 'lotteryMachinePrizeItem',

  props: {
    option: {
      type: Object as PropType<lotteryMachineOption>,
      default: () => ({})
    },
    style: {
      type: Object as PropType<CSSProperties>,
      default: () => ({})
    }
  },

  setup(props) {
    const prizeItemStyle: CSSProperties = {
      backgroundImage: `url(${props.option.image})`,
      ...props.style
    }

    return () => <div style={prizeItemStyle} class={styles.prizeItem}></div>
  }
})
