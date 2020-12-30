import lotteryMachine from '@/pages/lotteryMachine'
import { MarketComponent } from './component'
export type lotteryMachineUseOption = {
  prizeWidth: number
  prizeMargin: number
  hideBoxWidth: number
  prizeList: {
    image: string
    [key: string]: any
  }[]
  [key: string]: any
}
export class LotteryMachine extends MarketComponent {
  [key: string]: any
  static useLottery(lotteryMachineUseOption: lotteryMachineUseOption): void
}
export type lotteryMachineOption = {
  image: string
}
export type lotteryMachineOptions = Array<lotteryMachineOption>
