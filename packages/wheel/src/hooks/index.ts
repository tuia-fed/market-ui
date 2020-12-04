import { ref } from 'vue'
import Rotate from './rotate'

export default function useRotate(angle: number) {
  const state = ref(angle)

  const onUpdate = (value: number) => {
    state.value = value
  }
  const rotate = new Rotate(onUpdate)

  return [state, rotate] as const
}
