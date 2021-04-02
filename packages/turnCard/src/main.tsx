import { PropType, ref } from 'vue'
import Card from './components/card'
import { createComponent } from './create'
import { noop } from '../../shared/utils'
import { OnCardClick, CardOptions } from 'types'
import styles from './styles'
import useAnimation from './hooks'

let uid = 0

export default createComponent({
  Card,
  useAnimation,

  props: {
    width: {
      type: Number,
      default: 200
    },
    height: {
      type: Number,
      default: 288
    },
    column: {
      type: Number,
      default: 3
    },
    columnGap: {
      type: Number,
      default: 10
    },
    options: {
      type: Array as PropType<CardOptions>,
      required: true
    },
    activeIndex: {
      type: Number,
      default: -1
    },
    onCardClick: {
      type: Function as PropType<OnCardClick>,
      default: noop
    },
    activeClassName: {
      type: String,
      default: 'active'
    }
  },
  setup(props) {
    // 给组件生成一个唯一ID
    const id = ref('turncard-' + ++uid)

    return () => (
      <div class={styles.container} id={id.value}>
        {props.options.map((item, i) => (
          <Card
            onClick={props.onCardClick}
            width={props.width}
            height={props.height}
            index={i}
            option={item}
            activeName={i === props.activeIndex ? props.activeClassName : ''}
          />
        ))}
      </div>
    )
  }
})
