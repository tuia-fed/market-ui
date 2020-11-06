import { ref } from 'vue'
import Rotate from './rotate'

export default function useRotate(
  angle: number,
  splitNum: number,
  clockwise: boolean
) {
  const state = ref(angle)

  const onUpdate = (value: number) => {
    state.value = value
  }

  const rotate = new Rotate(onUpdate, splitNum, clockwise)

  return [state, rotate] as const
}
