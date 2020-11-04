import { CSSProperties, defineComponent, PropType } from 'vue'
import styles from './styles.module.less'

export default defineComponent({
  name: 'Card',

  props: {
    style: {
      type: Object as PropType<CSSProperties>,
      default: () => ({})
    }
  },

  setup(props) {
    return () => <div style={props.style} class={styles.card}></div>
  }
})
