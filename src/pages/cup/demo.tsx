import { CSSProperties, defineComponent } from 'vue'
import Cup from 'packages/cup'
import cupImage from '@/assets/cup.png'
import coinImage from '@/assets/coin.png'
import startBtn from '@/assets/start_btn.png'

export default defineComponent({
  name: 'cupDemo',

  setup() {
    const [list, direction, cupNumber, interval, turn] = Cup.useTurn()

    const backgroundStyle: CSSProperties = {
      width: '100%',
      height: '300px',
      backgroundImage:
        'url(//yun.duiba.com.cn/duiba-live/welfareRainV2/rain_bg.png)',
      backgroundSize: '100% auto'
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

    function onCupClick(index: number, isIndex: boolean) {
      turn.cupUp(index).then(() => {
        if (isIndex) {
          alert('猜对了')
          turn.reset()
        } else {
          alert('猜错了')
          turn.reset()
        }
      })
    }

    const btnStyle: CSSProperties = {
      width: '204px',
      height: '55px',
      margin: 'auto',
      position: 'absolute',
      left: '50%',
      transform: 'translate(-50%, -80px)',
      backgroundImage: `url(${startBtn})`,
      backgroundSize: '100% 100%'
    }

    const mainStyle: CSSProperties = {
      width: '100vw'
    }

    return () => (
      <>
        <div style={mainStyle}>
          <Cup
            backgroundStyle={backgroundStyle}
            cupStyle={cupStyle}
            coinStyle={coinStyle}
            list={list.value}
            direction={direction.value}
            interval={interval.value}
            cupNumber={cupNumber.value}
            onCupClick={onCupClick}
          />
          <div style={btnStyle} onClick={start}></div>
        </div>
      </>
    )
  }
})
