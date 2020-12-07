import { onMounted, PropType, ref } from 'vue'
import { createComponent } from './create'
import { PaintBrush } from './tool'

let uid = 0
export default createComponent({
  props: {
    width: {
      type: Number,
      default: 360
    },
    height: {
      type: Number,
      default: 200
    },
    paintCoat: {
      type: String, // 可以传图片地址，也可以穿颜色值
      default: '#979797'
    },
    autoPlay: {
      type: Boolean,
      default: true
    },
    autoPoints: {
      type: Array as PropType<Array<Array<number>>>,
      default: [
        [300, 40],
        [90, 90],
        [330, 120],
        [70, 210],
        [330, 260]
      ]
    },
    targetRate: {
      type: Number,
      default: 0.3
    },
    onTouchStart: {
      type: Function,
      default: null
    },
    onTouchEnd: {
      type: Function,
      default: null
    }
  },

  setup(props, {emit}) {
    const width = props.width
    const height = props.height
    let paintBrush: PaintBrush
    let mouseDown = false
    const visible = ref('block')
    const id = ref('scratch-' +  ++uid)


    const startHandler = (e: TouchEvent) => {
      // 开始刮
      if (props.onTouchStart) {
        // 如果定义了开始刮之前的事件，且必须在事件完成之后才开始刮，则如下，否则在demo里直接写事件即可
        emit('touchStart', e, () => {
          paintBrush.touchActive(e)
        })
      } else {
        paintBrush.touchActive(e)
      }
    }
    const moveHandler = (e: TouchEvent) => {
      // 刮过程中要做的事情
      e.preventDefault()
      paintBrush.touchActive(e)
    }

    const endHandler = (e: TouchEvent | MouseEvent) => {
      // 刮完之后要做的事
      mouseDown = false
      e.preventDefault()
      paintBrush.playEnd(
        props.targetRate,
        props.autoPlay,
        props.autoPoints,
        () => {
          // 隐藏canvas，要能点击券
          visible.value = 'none'
          props.onTouchEnd && emit('touchEnd', e)
        }
      )
    }

    const mouseStartHandler = (e: MouseEvent) => {
      // 鼠标开始事件
      mouseDown = true
      paintBrush.fillWhite(e.offsetX, e.offsetY)
    }
    const mouseMoveHandler = (e: MouseEvent) => {
      // 鼠标移动事件
      if (mouseDown) {
        e.preventDefault()
        paintBrush.fillWhite(e.offsetX, e.offsetY)
      }
    }
    onMounted(() => {
      const dom = document.getElementById(id.value) as HTMLCanvasElement
      paintBrush = new PaintBrush(dom, width, height)
      paintBrush.init(props.paintCoat)
    })
    return () => (
      <canvas
        id={id.value}
        style={{
          background: 'transparent',
          position: 'absolute',
          display: visible.value
        }}
        width={width}
        height={height}
        onTouchstart={startHandler}
        onTouchmove={moveHandler}
        onTouchend={endHandler}
        onTouchcancel={endHandler}
        onMousedown={mouseStartHandler}
        onMousemove={mouseMoveHandler}
        onMouseup={endHandler}
      ></canvas>
    )
  }
})
