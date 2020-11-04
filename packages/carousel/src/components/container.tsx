import { computed, CSSProperties, defineComponent, PropType, ref } from 'vue'
import Card from './card'
import styles from './styles.module.less'
import { tween, easing, transform } from 'popmotion'
import { CardTouchFunction } from 'packages/carousel/types'

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

    let startClientX = 0
    const rotateRate = 1

    const onTouchstart: CardTouchFunction = e => {
      console.log('onTouchstart', e)
      startClientX = e.touches[0].clientX
    }
    const onTouchmove: CardTouchFunction = e => {
      // console.log('onTouchmove', e)
      e.preventDefault()
      // TODO: 实际该算得是速度 engine/cocos2d/core/components/CCScrollView.js:1335
      angle.value += (e.touches[0].clientX - startClientX) * rotateRate
      startClientX = e.touches[0].clientX
    }
    const onTouchend: CardTouchFunction = e => {
      // 重置回360度以内
      // angle.value %= 360
      console.log('onTouchend', e)
    }

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
            <Card
              onTouchstart={onTouchstart}
              onTouchmove={onTouchmove}
              onTouchend={onTouchend}
            ></Card>
          ))}
        </div>
      </div>
    )
  }
})
