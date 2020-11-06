import { CSSProperties, defineComponent, PropType, computed } from 'vue'
import RotationSingle from './single'

import styles from '../styles'
import { RotationOptions } from '../../types'
import useRotation from '../hooks'
import { noop } from '../../../shared/utils'

export default defineComponent({
  RotationSingle,
  useRotation,

  name: 'rotationContainer',

  props: {
    width: {
      type: Number,
      default: 672
    },
    height: {
      type: Number,
      default: 354
    },
    singleWidth: {
      type: Number,
      default: 180
    },
    singleHeight: {
      type: Number,
      default: 180
    },
    singleMargin: {
      type: Number,
      default: 20
    },
    hideBoxWidth: {
      type: Number,
      default: 602
    },
    hideBoxHeight: {
      type: Number,
      default: 300
    },
    singleList: {
      type: Array as PropType<RotationOptions>,
      default: () => []
    },
    style: {
      type: Object as PropType<CSSProperties>,
      default: () => () => ({})
    },
    angle: {
      type: Number,
      default: 0
    },
    duration: {
      type: Number,
      default: 3000
    },
    onStart: {
      type: Function,
      default: noop
    }
  },

  setup(props, ctx) {
    const startAngle =
      (props.singleWidth + props.singleMargin) * props.singleList.length -
      props.hideBoxWidth
    const [angle, rotation] = useRotation(-startAngle, startAngle)

    const BackgroundStyle: CSSProperties = {
      width: props.width + 'px',
      height: props.height + 'px',
      ...props.style
    }
    const SingleStyle: CSSProperties = {
      width: props.singleWidth + 'px',
      height: props.singleHeight + 'px',
      marginRight: props.singleMargin + 'px'
    }
    const priceCellStyle = computed(() => {
      const result: CSSProperties = {}
      result.transform = `translate(${angle.value}px, 0)`
      return result
    })
    const hideBoxStyle: CSSProperties = {
      width: props.hideBoxWidth + 'px',
      height: props.hideBoxHeight + 'px'
    }

    rotation.idled(props.duration)

    const stop = (index: number) => {
      rotation.stop(index)
    }

    const start = () => {
      rotation.start()
      props.onStart(stop)
    }

    console.log(ctx)

    return () => (
      <div style={BackgroundStyle} class={styles.container}>
        <div style={hideBoxStyle} class={styles['hide-box']}>
          <div style={priceCellStyle.value} class={styles['price-cell']}>
            {props.singleList.map(item => (
              <RotationSingle
                option={item}
                style={SingleStyle}
              ></RotationSingle>
            ))}
          </div>
        </div>
        <div onClick={start}>{(ctx.slots.default as Function)()}</div>
      </div>
    )
  }
})
