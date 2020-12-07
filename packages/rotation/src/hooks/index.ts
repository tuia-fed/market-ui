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
  const startAngle =
    (singleWidth + singleMargin) * singleList.length - hideBoxWidth
  const correctWidth = (singleWidth + singleMargin) * singleList.length

  const state = ref(-startAngle)

  const onUpdate = (value: number) => {
    state.value = value - correctWidth
  }
  const stopPosition = (index: number) => {
    const position =
      -correctWidth * (index === 1 ? 0 : 1) +
      hideBoxWidth / 2 +
      (singleWidth * (index - 0.5) + singleMargin * index)
    return position
  }
  const r = new Rotation(onUpdate, startAngle, correctWidth, stopPosition)

  return [state, r] as const
}
