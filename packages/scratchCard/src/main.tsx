import { onMounted, PropType } from 'vue'
import { createComponent } from './create'
import { createImgObj, PaintBrush } from './tool'

export default createComponent({
  name: 'ScratchCard',
  props: {
    width: {
      type: Number,
      default: 552
    },
    height: {
      type: Number,
      default: 338
    },
    paintCoat: {
      type: String, // 可以传图片地址，也可以穿颜色值
      default: ''
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
    touchStartAct: {
      type: Function,
      default: null
    },
    touchEndAct: {
      type: Function,
      default: null
    },
    isPlaying: {
      type: Boolean,
      default: false
    },
    isShowCanvas: {
      type: String,
      default: 'block'
    }
  },

  setup(props, { emit }) {
    const defaultColor = '#979797'
    const targetRate = props.targetRate > 0 ? props.targetRate : 0.3
    const width = props.width
    const height = props.height
    let paintObj: PaintBrush
    let mouseDown = false
    let imgWhiteNum = 0 // 图片原本存在的空白点位

    // 初始化渲染canvas
    const initRender = () => {
      if (props.paintCoat.indexOf('#') !== -1 && props.paintCoat.length < 8) {
        // 如果是颜色值
        paintObj.drawColor(props.paintCoat)
      } else if (props.paintCoat !== '') {
        // 是图片地址
        const imgObj = createImgObj(props.paintCoat)
        imgObj.onload = () => {
          paintObj.drawImage(imgObj).then(() => {
            // 画完之后计算空白点位，可能存在图片小于canvas尺寸的情况
            imgWhiteNum = paintObj.calWhite(width, height) || 0
          })
        }
      } else {
        // 没传，用默认的颜色
        paintObj.drawColor(defaultColor)
      }
    }

    const startHandler = (e: TouchEvent) => {
      // 开始刮
      if (props.touchStartAct) {
        props.touchStartAct()
      }
      paintObj.touchActive(e)
    }
    const moveHandler = (e: TouchEvent) => {
      // 刮过程中要做的事情
      e.preventDefault()
      paintObj.touchActive(e)
    }

    const endHandler = (e: TouchEvent | MouseEvent) => {
      // 刮完之后要做的事
      mouseDown = false
      e.preventDefault()
      let num = 0
      let percent
      try {
        // 计算刮开区域像素点
        const totalPixelInfo = paintObj.cvsContext.getImageData(0, 0, paintObj.cWidth, paintObj.cHeight)
        const pData = totalPixelInfo.data
        for (let i = 0; i < pData.length; i++) {
          if (pData[i] === 0) {
            num++
          }
        }
        // 计算刮开百分比
        percent = (num - imgWhiteNum) / (pData.length - imgWhiteNum)
      } catch (e) {
        percent = targetRate
      }
      // 百分比 <= 0.3 ,刮刮卡展开再出券
      // 百分比 > 0.3, 刮刮卡直接出券
      if (percent < targetRate && props.autoPlay) {
        setTimeout(() => {
          paintObj.autoPlay(props.autoPoints).then(() => {
            props.touchEndAct && props.touchEndAct()
          })
        }, 1000)
      } else {
        props.touchEndAct && props.touchEndAct()
      }
    }

    const mouseStartHandler = (e: MouseEvent) => {
      console.log('ssssstart')
      // 鼠标开始事件
      mouseDown = true
      paintObj.fillWhite(e.offsetX, e.offsetY)
    }
    const mouseMoveHandler = (e: MouseEvent) => {
      // 鼠标移动事件
      if (mouseDown) {
        e.preventDefault()
        paintObj.fillWhite(e.offsetX, e.offsetY)
      }
    }
    onMounted(() => {
      const dom = document.getElementById('canvasId') as HTMLCanvasElement
      dom.style.background = 'transparent'
      paintObj = new PaintBrush(dom, width, height)
      initRender()
    })
    return () => (
      <canvas
        id="canvasId"
        style={{ display: props.isShowCanvas, background: 'transparent', position: 'absolute' }}
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
