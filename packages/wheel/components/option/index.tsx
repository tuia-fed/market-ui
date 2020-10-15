import { defineComponent, CSSProperties, PropType } from 'vue'
import styles from '../../styles'
import { isUndef, noop } from '../../../shared/utils'
import { WheelOption, WheelOptionClick } from '../../types'

export default defineComponent({
  name: 'WheelOption',

  props: {
    option: {
      type: Object as PropType<WheelOption>,
      default: () => ({
        name: ''
      })
    },
    size: {
      type: Number,
      default: 150
    },
    index: {
      type: Number,
      default: 0
    },
    titleStyle: {
      type: Object as PropType<CSSProperties>,
      default: () => ({})
    },
    imageStyle: {
      type: Object as PropType<CSSProperties>,
      default: () => ({})
    },
    onClick: {
      type: Function as PropType<WheelOptionClick>,
      default: noop
    }
  },

  setup(props, { emit }) {
    if (isUndef(props.index)) throw Error('必须指定option的index属性')

    const OptionStyle: CSSProperties = {
      width: `${props.size}px`,
      height: `${props.size}px`,
      transform: `rotate(${-15 + props.index * 60}deg) skew(15deg, 15deg)`
    }

    const OptionRevertStyle: CSSProperties = {
      width: `${props.size * 0.5}px`,
      height: `${props.size * 0.5}px`,
      transform: `translate(-25%, -25%) skew(-15deg, -15deg) rotate(-45deg)`
    }

    const onClick = (e: MouseEvent) => {
      emit('click', e, props.index)
    }

    const image = props.option.image ? (
      <img
        style={props.imageStyle}
        class={styles.itemImage}
        src={props.option.image}
        alt={props.option.title}
      />
    ) : (
      ''
    )

    return () => (
      <div onClick={onClick} style={OptionStyle} class={styles.option}>
        <div style={OptionRevertStyle} class={styles.optionRevert}>
          <div class={styles.item}>
            <div class={styles.itemTitle} style={props.titleStyle}>
              {props.option.title}
            </div>
            {image}
          </div>
        </div>
      </div>
    )
  }
})
