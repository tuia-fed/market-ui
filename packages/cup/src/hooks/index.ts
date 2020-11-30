import { ref } from 'vue'
import Turn from './turn'

export default function useTurn() {
  const list = ref([0, 1, 2])
  const direction = ref('')
  const cupNumber = ref(-1)
  const interval = ref(0.5)

  const onUpdate = (obj: {
    list: number[]
    direction: string
    cupNumber: number
    interval: number
  }) => {
    list.value = obj.list
    direction.value = obj.direction
    cupNumber.value = obj.cupNumber
    interval.value = obj.interval
  }
  const t = new Turn(onUpdate, list.value, direction.value, cupNumber.value)

  return [list, direction, cupNumber, interval, t] as const
}
