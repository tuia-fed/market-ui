import { CSSProperties, defineComponent, ref } from 'vue'
import { RotationContainer } from 'packages/rotation'
import { fetchData } from '@/shared/utils'

export default defineComponent({
  name: 'RotationDemo',

  setup() {
    const backgroundStyle: CSSProperties = {
      backgroundImage:
        'url("//yun.tuisnake.com/mami-media/img/185adc53-zsnihatxyl.png")'
    }

    const singleStyle = {
      image:
        '//yun.tuisnake.com/h5-mami/dist/item1.84574200c69f49c151a53126b534227c.png'
    }

    const singleList = [0, 1, 2, 3, 4, 5, 6].map(() => {
      return singleStyle
    })

    const width = ref(672)
    const height = ref(354)
    const singleWidth = ref(180)
    const singleHeight = ref(180)
    const singleMargin = ref(20)
    const hideBoxWidth = ref(602)
    const hideBoxHeight = ref(300)
    const duration = ref(3000)

    const onStart = (stop: Function) => {
      fetchData().then(() => {
        stop(1)
      })
    }

    return () => (
      <RotationContainer
        width={width.value}
        height={height.value}
        singleWidth={singleWidth.value}
        singleHeight={singleHeight.value}
        singleMargin={singleMargin.value}
        singleList={singleList}
        hideBoxWidth={hideBoxWidth.value}
        hideBoxHeight={hideBoxHeight.value}
        style={backgroundStyle}
        duration={duration.value}
        onStart={onStart}
      >
        <div
          style={{
            position: 'absolute',
            width: '100px',
            height: '100px',
            left: '275px',
            top: '400px',
            backgroundColor: 'red',
            backgroundSize: '100% 100%',
            borderRadius: '50%',
            color: '#fff',
            fontSize: '24px',
            textAlign: 'center',
            lineHeight: '100px'
          }}
        >
          start
        </div>
      </RotationContainer>
    )
  }
})
