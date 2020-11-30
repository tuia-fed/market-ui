import { CSSProperties, defineComponent, ref } from 'vue'
import { RotationContainer } from 'packages/rotation'
import { fetchData } from '@/shared/utils'
import './index.less'

export default defineComponent({
  name: 'RotationDemo',

  setup() {
    const backgroundStyle: CSSProperties = {
      backgroundImage:
        'url("//yun.tuisnake.com/mami-media/img/185adc53-zsnihatxyl.png")'
    }

    const singleList = [
      {
        image:
          '//yun.tuisnake.com/h5-mami/dist/item1.84574200c69f49c151a53126b534227c.png'
      },
      {
        image:
          '//yun.tuisnake.com/h5-mami/dist/item7.dbbecfdbafca57d3d193809269a87bc2.png'
      },
      {
        image:
          '//yun.tuisnake.com/h5-mami/dist/item6.78b4b54eedbf3b1431a174716b448929.png'
      },
      {
        image:
          '//yun.tuisnake.com/h5-mami/dist/item2.ccc21bbd9aea52fbbe28942ef371e0a1.png'
      },
      {
        image: '//yun.tuisnake.com/mami-media/img/95ed6c20-y3h2swcaon.png'
      },
      {
        image:
          '//yun.tuisnake.com/h5-mami/dist/item4.66875fb5074404008a1d408ed0167b60.png'
      },
      {
        image:
          '//yun.tuisnake.com/h5-mami/dist/item5.011718b84ce43874b7d18dbbe9c4f649.png'
      }
    ]

    const width = ref(672)
    const height = ref(354)
    const singleWidth = ref(180)
    const singleHeight = ref(180)
    const singleMargin = ref(20)
    const hideBoxWidth = ref(602)
    const hideBoxHeight = ref(300)
    const duration = ref(6000)

    const rotationData = {
      singleWidth: singleWidth.value,
      singleMargin: singleMargin.value,
      hideBoxWidth: hideBoxWidth.value,
      singleList
    }

    const [angle, rotation] = RotationContainer.useRotation(rotationData)

    rotation.idled(duration.value)

    const onStart = () => {
      rotation.start()
      fetchData().then(() => {
        rotation.stop(
          {
            index: 1,
            duration: 1000,
            complete: () => {
              console.log('end')
              setTimeout(() => {
                rotation.reset(duration.value)
              }, 2000)
            }
          },
          false
        )
      })
    }

    return () => (
      <div class="demo-container">
        <RotationContainer
          width={width.value}
          height={height.value}
          singleWidth={singleWidth.value}
          singleHeight={singleHeight.value}
          singleMargin={singleMargin.value}
          singleList={singleList}
          hideBoxWidth={hideBoxWidth.value}
          hideBoxHeight={hideBoxHeight.value}
          backgroundStyle={backgroundStyle}
          duration={duration.value}
          angle={angle.value}
        ></RotationContainer>
        <div onClick={onStart} class="demo-btn">
          start
        </div>
      </div>
    )
  }
})
