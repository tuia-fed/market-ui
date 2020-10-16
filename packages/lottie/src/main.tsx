import { createComponent } from './create'
import Lottie from 'lottie-web'
import { CSSProperties, onMounted, ref } from 'vue'

export default createComponent({
  props: {
    width: {
      type: Number,
      default: 200
    },
    height: {
      type: Number,
      default: 200
    },
    autoplay: {
      type: Boolean,
      default: true
    },
    data: Object,
    path: String
  },

  setup(props) {
    const container = ref()

    const style: CSSProperties = {
      width: `${props.width}px`,
      height: `${props.height}px`
    }

    onMounted(() => {
      Lottie.loadAnimation({
        container: container.value,
        animationData: props.data,
        path: props.path,
        autoplay: props.autoplay
      })
    })

    return () => <div style={style} ref={container}></div>
  }
})
