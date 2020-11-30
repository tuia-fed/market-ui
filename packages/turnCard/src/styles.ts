import { createClassname } from './create'
import './index.less'

export default {
  container: createClassname('container'),
  cardWraper: createClassname('card_wraper'),
  cardFront: createClassname('card_front'),
  cardBack: createClassname('card_back'),
  frontTurnBack: createClassname('card_front_active'),
  backTurnFront: createClassname('card_back_active')
}
