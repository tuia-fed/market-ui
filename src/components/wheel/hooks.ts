import { ref } from 'vue'
import Rotate from './rotate'

export default function useRotate(angle: number) {
  const state = ref(angle)

  const onUpdate = (value: number) => {
    state.value = value
  }
  const r = new Rotate(onUpdate)

  return [state, r] as const
}
