import { computed, CSSProperties, defineComponent, PropType, ref } from 'vue'
import Card from './card'
import styles from './styles.module.less'

function getAngleByIndex(index: number, splitNum: number) {
  return index * (360 / splitNum)
}


export default defineComponent({
  name: 'Container',

  Card,

  props: {
    angle: {
      type: Number,
      default: 0,
    },

    splitNum: {
      type: Number,
      default: 6
    },

    cardStyle: {
      type: Object as PropType<CSSProperties>,
      default: () => ({})
    },

    radius: {
      type: Number,
      default: 0
    }
  },

  setup(props) {
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

    // let startClientX = 0
    // const rotateRate = 1

    // const onTouchstart: CardTouchFunction = e => {
    //   console.log('onTouchstart', e)
    //   startClientX = e.touches[0].clientX
    // }
    // const onTouchmove: CardTouchFunction = e => {
    //   // console.log('onTouchmove', e)
    //   e.preventDefault()
    //   // TODO: 实际该算得是速度 engine/cocos2d/core/components/CCScrollView.js:1335
    //   angle.value += (e.touches[0].clientX - startClientX) * rotateRate
    //   startClientX = e.touches[0].clientX
    // }
    // const onTouchend: CardTouchFunction = e => {
    //   // 重置回360度以内
    //   // angle.value %= 360
    //   console.log('onTouchend', e)
    // }

    const centerStyle = computed(() => ({
      transform: `rotateY(${props.angle}deg)`
    }))

    return () => (
      <div class={styles.container}>
        {/* 旋转中心 */}
        <div class={styles.center} style={centerStyle.value}>
          {Array(props.splitNum)
            .fill(undefined)
            .map((_, index) => (
              <Card
                index={index}
                rotateY={getAngleByIndex(index, props.splitNum)}
                radius={props.radius}
                style={props.cardStyle}
              ></Card>
            ))}
        </div>
      </div>
    )
  }
})
