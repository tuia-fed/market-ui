import { FunctionalComponent, CSSProperties, PropType } from 'vue'
import Card from './components/card'
import { createComponent } from './create'
import { noop } from '../../shared/utils'
import CardRenderFunction from './components/card/render'
import { CardClick, CardOption, CardOptions } from '../types'
import styles from './styles'

export default createComponent({
  Card,

  props: {
    width: {
      type: Number,
      default: 200
    },
    height: {
      type: Number,
      default: 288
    },
    options: {
      type: Array as PropType<CardOptions>,
      required: true
    },
    activeIndex: {
      type: Number,
      required: true
    },
    cardClick: {
      type: Function as PropType<CardClick>,
      default: noop
    },
    optionRender: {
      type: Function as PropType<FunctionalComponent>,
      default: (option: CardOption) => <CardRenderFunction {...option} />
    }
  },
  // class={styles[`cardNum${props.cardNum}`]}
  setup(props) {
    const bgStyle: CSSProperties = {
      height: `${(props.height + 20) * Math.ceil(props.options.length / 3)}px`
    }

    return () => (
      <div class={styles.cardNum} style={bgStyle}>
        {props.options.map((item, i) => (
          <Card
            onClick={props.cardClick}
            width={props.width}
            height={props.height}
            index={i}
            option={item}
            active={props.activeIndex * 1 === i}
            render={props.optionRender}
          />
        ))}
      </div>
    )
  }
})
