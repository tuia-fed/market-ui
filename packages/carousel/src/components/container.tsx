import { computed, CSSProperties, defineComponent, PropType, ref } from 'vue'
import Card from './card'
import styles from './styles.module.less'
import { tween, easing } from 'popmotion'

export default defineComponent({
  name: 'Container',

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
    const angle = ref(0)

    // tween({
    //   from: 0,
    //   to: 360,
    //   loop: Infinity,
    //   duration: 4000,
    //   ease: easing.linear
    // }).start({
    //   update: (latest: number) => {
    //     // console.log(latest)
    //     angle.value = latest
    //   }
    // })

    const centerStyle = computed(() => ({
      transform: `rotateY(${angle.value}deg)`
    }))

    const cardList: Array<number> = []

    for (let i = 1; i <= props.cardNum; i++) {
      cardList.push(i)
    }

    return () => (
      <div class={styles.container}>
        <div class={styles.center} style={centerStyle.value}>
          {cardList.map(() => (
            <Card></Card>
          ))}
        </div>
      </div>
    )
  }
})
