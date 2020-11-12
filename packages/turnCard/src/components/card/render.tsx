import { defineComponent } from 'vue'
import styles from '../../styles'

export default defineComponent({
  props: {
    itemImg: String
  },

  setup(props) {
    const image = props.itemImg ? (
      <img class={styles.itemImage} src={props.itemImg} />
    ) : (
      ''
    )

    return () => (
      <div class={styles.item}>
        {image}
      </div>
    )
  }
})