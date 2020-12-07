import { createClassname } from './create'
import './index.less'

interface StyleType {
  [index: string]: string
}
const styles: StyleType = {
  item1: createClassname('item1'),
  item2: createClassname('item2'),
  item3: createClassname('item3'),
  coin: createClassname('coin'),
  cup: createClassname('cup'),
  cupMove: createClassname('cup_move')
}
export default styles
