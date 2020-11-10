import { CSSProperties, PropType } from 'vue'
import Card from './components/card'
import CardBack from './components/cardBack'
import { createComponent } from './create'
import styles from './styles'

export default createComponent({
  Card,
  CardBack,

  props: {
    width: {
      type: Number,
      default: 200
    },
    height: {
      type: Number,
      default: 288
    },
    cardStyle: {
      type: Object as PropType<CSSProperties>,
      default: () => ({})
    },
    cardBackStyle: {
      type: Object as PropType<CSSProperties>,
      default: () => ({})
    },
    turn: {
      type: Boolean,
      default: false
    },
    cardNum: {
      type: Number,
      default: 3
    }
  },
  // class={styles[`cardNum${props.cardNum}`]}
  setup(props) {
    const style: CSSProperties = {
      width: `${props.width}px`,
      height: `${props.height}px`
    }
    const list: Array<number | boolean> = []
    for (let i = 0; i < props.cardNum; i++) {
      list.push(false)
    }

    const onClick: Function = (i: number) => {
      list[i] = true
      console.log(list, i)
    }
    return () => (
      <div class={styles[`cardNum${list.length}`]}>
        {list.map((item, i) => (
          <div class={styles.cardBox} style={style}>
            <Card
              turn={props.turn}
              onClick={onClick(i)}
              style={props.cardStyle}
              width={props.width}
              height={props.height}
            />
            <CardBack
              turn={props.turn}
              backStyle={props.cardBackStyle}
              width={props.width}
              height={props.height}
            />
          </div>
        ))}
      </div>
    )
  }
})
