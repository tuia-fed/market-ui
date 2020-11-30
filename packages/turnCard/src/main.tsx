import { PropType, ref, computed, onMounted } from 'vue'
import Card from './components/card'
import { createComponent } from './create'
import { noop } from '../../shared/utils'
import { OnCardClick, CardOptions } from '../types'
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
    // 计算组件容器的宽度
    const autoSize = ref(0)

    onMounted(() => {
      // 组件挂载成功之后，才能拿到真实的组件容器宽度
      const el = document.getElementById(id.value)
      const rect = (el?.parentNode as Element).getBoundingClientRect()
      autoSize.value = rect.width
    })

    // 计算列间距的总和
    const gaps = computed(() => {
      return (props.column - 1) * props.columnGap
    })

    // 根据容器宽度，列间距，卡片宽高比，计算卡片的真实宽高
    const rect = computed(() => {
      const width = (autoSize.value - gaps.value) / props.column
      return {
        width,
        height: (width * props.height) / props.width
      }
    })

    return () => (
      <div class={styles.container} id={id.value}>
        {props.options.map((item, i) => (
          <Card
            onClick={props.onCardClick}
            width={rect.value.width}
            height={rect.value.height}
            index={i}
            option={item}
            activeName={i === props.activeIndex ? props.activeClassName : ''}
          />
        ))}
      </div>
    )
  }
})
