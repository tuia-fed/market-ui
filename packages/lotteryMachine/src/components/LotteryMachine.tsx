import { CSSProperties, defineComponent, PropType, computed } from 'vue'
import lotteryMachinePrizeItem from './prizeItem'

import styles from '../styles'
import { lotteryMachineOptions } from 'types'
import useLottery from '../hooks'

export default defineComponent({
  lotteryMachinePrizeItem,
  useLottery,

  name: 'lotteryMachine',

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
      type: Array as PropType<lotteryMachineOptions>,
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

    const renderItem = (prizeOriginName: string) => {
      return (
        <div style={priceCellStyle.value} class={styles[prizeOriginName]}>
          {props.prizeList.map(item => (
            <lotteryMachinePrizeItem
              option={item}
              style={props.prizeItemStyle}
            ></lotteryMachinePrizeItem>
          ))}
        </div>
      )
    }

    const prizeArr = ['price-cell-copy', 'price-cell']

    return () => (
      <div style={props.hideBoxStyle} class={styles['hide-box']}>
        {prizeArr.map(prizeOriginName => {
          return renderItem(prizeOriginName)
        })}
      </div>
    )
  }
})
