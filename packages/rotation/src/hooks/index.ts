import { ref } from 'vue'
import Rotation from './rotation'

export default function useRotation(angle: number, startAngle: number) {
  const state = ref(angle)

  const onUpdate = (value: number) => {
    state.value = value
  }
  const r = new Rotation(onUpdate, angle, startAngle)

  return [state, r] as const
}
