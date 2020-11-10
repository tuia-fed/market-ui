import { defineComponent } from 'vue'
import styles from '../../styles'

export default defineComponent({
  props: {
    title: String,
    image: String,
    active: Boolean,
    index: Number
  },

  setup(props) {
    
    const image = props.image ? (
      <img class={styles.itemImg} src={props.image} alt={props.title} />
    ) : (
      ''
    )
    function getBgColor (index:number){
      const remainder = index % 4
      switch(remainder){
        case 0:
          return '#FC9D9A'  
        case 1:
          return '#F9CDAD'  
        case 2:
          return '#C8C8A9'
        case 3:
          return '#83AF9B'
      }
    }

    return () => (
      <div 
        class={`${styles.cubeItem} ${props.active? `${styles.itemActive}` : ''}`}
        style={{backgroundColor: getBgColor(props.index as number)}}
      >
        <div class={styles.itemTitle}>{props.title}</div>
        {image}
      </div>
    )
  }
})
