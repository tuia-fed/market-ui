import { defineComponent, computed } from 'vue'
import styles from '../../styles'

export default defineComponent({
  props: {
    itemImg: String
  },

  setup(props) {
    const itemStyle = computed(() => ({
      backgroundImage: `url(${props.itemImg ? props.itemImg : ''})`
    }))

    return () => <div class={styles.item} style={itemStyle.value}></div>
  }
})
