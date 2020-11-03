import { defineComponent } from 'vue'
import styles from '../../styles'

export default defineComponent({
  props: {
    title: String,
    image: String
  },

  setup(props) {
    const image = props.image ? (
      <img class={styles.itemImage} src={props.image} alt={props.title} />
    ) : (
      ''
    )

    return () => (
      <div class={styles.item}>
        <div class={styles.itemTitle}>{props.title}</div>
        {image}
      </div>
    )
  }
})
