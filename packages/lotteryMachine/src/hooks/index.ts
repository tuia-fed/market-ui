import { ref } from 'vue'
import Lottery from './lottery'

export interface LotteryMachineDataType {
  prizeWidth: number
  prizeMargin: number
  prizeList: Array<any>
  hideBoxWidth: number
}

export default function useLottery(lotteryMachineData: LotteryMachineDataType) {
  const {
    prizeWidth,
    prizeMargin,
    prizeList,
    hideBoxWidth
  } = lotteryMachineData
  const startAngle =
    (prizeWidth + prizeMargin) * prizeList.length - hideBoxWidth
  const correctWidth = (prizeWidth + prizeMargin) * prizeList.length

  const state = ref(-startAngle)

  const onUpdate = (value: number) => {
    state.value = value - correctWidth
  }
  const stopPosition = (index: number) => {
    const position =
      -correctWidth * (index === 1 ? 0 : 1) +
      hideBoxWidth / 2 +
      (prizeWidth * (index - 0.5) + prizeMargin * index)
    return position
  }
  const r = new Lottery(onUpdate, startAngle, correctWidth, stopPosition)

  return [state, r] as const
}
