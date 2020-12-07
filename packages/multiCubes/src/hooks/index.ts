import { ref } from 'vue'
import Rotate from './rotate'

export interface UseRotateOption {
  rowNum: number
  idledSpeed?: number
  drawSpeed?: number
}

export default function useRotate(option: UseRotateOption) {
  const state = ref(0)

  const onUpdate = (value: number) => {
    state.value = value
  }
  const r = new Rotate({
    rowNum: option.rowNum,
    idledSpeed: option.idledSpeed || 150,
    drawSpeed: option.drawSpeed || 50,
    onUpdate
  })

  return [state, r] as const
}
