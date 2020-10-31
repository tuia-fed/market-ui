// import { CSSProperties, PropType } from 'vue'
import { createComponent } from './create'

export default createComponent({
  name: 'ScratchCard',
  props: {
    size: {
      type: Object,
      default: {
        width: 300,
        height: 200
      }
    },
    cardImg: {
      type: String, // 可以传图片地址，也可以穿颜色值
      default: ''
    },
    autoPlay: {
      type: Boolean,
      default: false
    },
    scratchedRate: {
      type: String,
      default: '0.3'
    },
    touchStartAct: {
      type: Function,
      default: null
    },
    touchEndAct: {
      type: Function,
      default: null
    }
  },

  setup(props) {
    const defaultColor = '#979797'
    const dom = document.getElementById('canvasId') as HTMLCanvasElement
    const cvsContext = dom.getContext('2d')

    const width = props.size.width + 'px'
    const height = props.size.height + 'px'
    // 初始化渲染canvas
    const initRender = () => {
      if (props.cardImg.indexOf('#') !== -1) {
        // 如果是颜色值
      } else if (props.cardImg !== '') {
        // 是图片地址
      } else {
        // 没传，用默认的颜色
      }
    }
    const startHandler = () => {
      if (props.touchStartAct) {
        props.touchStartAct()
      }
    }
    const moveHandler = () => {
      // 刮过程中要做的事情
    }
    const endHandler = () => {
      // 刮完之后要做的事
    }
    const mouseStartHandler = () => {
      // 鼠标开始事件
    }
    const mouseMoveHanlder = () => {
      // 鼠标移动事件
    }
    initRender()
    return () => {
      ;<canvas
        id="canvasId"
        width={width}
        height={height}
        onTouchstart={startHandler}
        onTouchmove={moveHandler}
        onTouchend={endHandler}
        onTouchcancel={endHandler}
        onMousedown={mouseStartHandler}
        onMousemove={mouseMoveHanlder}
        onMouseup={endHandler}
      ></canvas>
    }
  }
})
