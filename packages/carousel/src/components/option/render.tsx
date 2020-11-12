import { defineComponent } from 'vue'

export default defineComponent({
  props: {
    image: String
  },

  setup(props) {
    return () => (
      <div>
        <img src={props.image} />
      </div>
    )
  }
})
