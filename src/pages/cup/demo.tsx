import { CSSProperties, defineComponent } from 'vue'
import Cup from 'packages/cup'
import cupImage from '@/assets/cup.png'
import coinImage from '@/assets/coin.png'

export default defineComponent({
  name: 'cupDemo',

  setup() {
    const backgroundStyle: CSSProperties = {
      width: '500px',
      height: '300px',
      backgroundColor: '#1E90FF'
    }

    const cupStyle: CSSProperties = {
      width: '78px',
      height: '82px',
      backgroundImage: `url(${cupImage})`
    }

    const coinStyle: CSSProperties = {
      width: '46px',
      height: '20px',
      backgroundImage: `url(${coinImage})`
    }

    const interval = 0.5
    const times = 20

    function afterEnd(isRight:boolean) {
      console.log(isRight)
    }

    return () => (
      <>
        <Cup
          interval={interval}
          times={times}
          backgroundStyle={backgroundStyle}
          cupStyle={cupStyle}
          coinStyle={coinStyle}
          afterEnd={afterEnd}
        />
      </>
    )
  }
})
