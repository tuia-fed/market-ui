import { CSSProperties, defineComponent, PropType } from 'vue'

export default defineComponent({
  name: 'Card',

  props: {
    style: {
      type: Object as PropType<CSSProperties>,
      default: () => ({})
    }
  },

  setup(props) {
    return () => <div style={props.style}></div>
  }
})
