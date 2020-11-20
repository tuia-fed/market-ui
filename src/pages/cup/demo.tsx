import { CSSProperties, defineComponent } from 'vue'
import Cup from 'packages/cup'
import cupImage from '@/assets/cup.png'
import coinImage from '@/assets/coin.png'

export default defineComponent({
  name: 'cupDemo',

  setup() {
    const [list, direction, cupNumber, interval, turn] = Cup.useTurn()

    const backgroundStyle: CSSProperties = {
      width: '500px',
      height: '300px',
      backgroundColor: '#FFF'
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

    function start() {
      turn.start(0.1, 10)
    }

    function cupClick(index: number, isIndex: boolean) {
      turn.cupUp(index)
      if (isIndex) {
        setTimeout(() => {
          alert('猜对了')
        }, 1000)
      }
    }

    const btnStyle: CSSProperties = {
      width: '100px',
      height: '60px',
      margin: 'auto',
      position: 'absolute',
      left: '50%',
      marginTop: '40px',
      transform: 'translateX(-50%)'
    }

    return () => (
      <>
        <div>
          <Cup
            backgroundStyle={backgroundStyle}
            cupStyle={cupStyle}
            coinStyle={coinStyle}
            list={list.value}
            direction={direction.value}
            interval={interval.value}
            cupNumber={cupNumber.value}
            cupClick={cupClick}
          />
          <button style={btnStyle} onClick={start}>开始</button>
        </div>
      </>
    )
  }
})
