import { ref } from 'vue'
import Rotation from './rotation'

export interface RotationData {
  singleWidth: number
  singleMargin: number
  singleList: Array<any>
  hideBoxWidth: number
}

export default function useRotation(rotationData: RotationData) {
  const { singleWidth, singleMargin, singleList, hideBoxWidth } = rotationData
  const endAngle =
    (singleWidth + singleMargin) * singleList.length - hideBoxWidth
  const correctWidth = singleWidth + singleMargin

  const state = ref(-endAngle)

  const onUpdate = (value: number) => {
    state.value = value
  }
  const r = new Rotation(onUpdate, endAngle, correctWidth)

  return [state, r] as const
}
