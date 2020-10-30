import Card from './card'
import { CSSProperties, defineComponent, PropType } from 'vue'

export default defineComponent({
  name: 'Card',

  Card,

  props: {
    cardNum: {
      type: Number,
      default: 6
    },

    cardStyle: {
      type: Object as PropType<CSSProperties>,
      default: () => ({})
    }
  },

  setup(props) {
    return () => (
      <Card v-for="i in props.cardNum" key="i" style={props.cardStyle}></Card>
    )
  }
})
