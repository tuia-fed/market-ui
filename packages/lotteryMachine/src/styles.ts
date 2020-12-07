import { createClassname } from './create'
import './index.less'

interface PlainObject {
  [key: string]: any
}

const styles: PlainObject = {
  container: createClassname('container'),
  prizeItem: createClassname('prizeItem'),
  'hide-box': createClassname('hide-box'),
  'price-cell': createClassname('price-cell'),
  'price-cell-copy': createClassname('price-cell-copy')
}

export default styles
