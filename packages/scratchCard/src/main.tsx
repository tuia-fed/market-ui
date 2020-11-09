// import { CSSProperties, PropType } from 'vue'
import { createComponent } from './create'
import { tween, chain } from '@tuia/moto.js'

export default createComponent({
  name: 'ScratchCard',
  props: {
    size: {
      type: Object,
      default: {
        width: 552,
        height: 338
      }
    },
    cardImg: {
      type: String, // 可以传图片地址，也可以穿颜色值
      default: ''
    },
    autoPlay: {
      type: Boolean,
      default: true
    },
    autoPoints: {
      type: Array,
      default: [
        [500, 40],
        [60, 90],
        [530, 120],
        [40, 210],
        [530, 200],
        [30, 290]
      ]
    },
    targetRate: {
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
    },
    isPlaying: {
      type: Boolean,
      default: false
    }
  },

  setup(props, { emit }) {
    const defaultColor = '#979797'
    const dom = document.getElementById('canvasId') as HTMLCanvasElement
    const cvsContext = dom.getContext('2d') as CanvasRenderingContext2D
    const cvsBoxInfo = dom.getBoundingClientRect()

    const width = props.size.width
    const height = props.size.height
    const imgObj = new Image()

    let mouseDown = false
    let scratchedRate = 0 // 已经刮出的百分比

    let imgWhiteNum = 0 // 图片原本存在的空白点位
    // 初始化渲染canvas
    const initRender = () => {
      if (props.cardImg.indexOf('#') !== -1) {
        // 如果是颜色值
        cvsContext.fillStyle = props.cardImg
        cvsContext.fillRect(0, 0, width, height)
      } else if (props.cardImg !== '') {
        // 是图片地址
        createImgObj(props.cardImg)
      } else {
        // 没传，用默认的颜色
        cvsContext.fillStyle = defaultColor
        cvsContext.fillRect(0, 0, width, height)
      }
    }
    // 如果传入的是一个图片地址，创建图片对象
    const createImgObj = (src: string) => {
      imgObj.src = src
      imgObj.crossOrigin = 'anonymous'
      imgObj.onerror = e => {
        imgObj.src =
          'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAArEAAAGSAQMAAADOxAtrAAAAA1BMVEWXl5cPTYmVAAAAOUlEQVR42u3BgQAAAADDoPtT32AE1QAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABIB4owAAGsmJ4nAAAAAElFTkSuQmCC'
          imgObj.onerror = null
      }
      imgObj.onload = () => {
        drawImage()
      }
    }
    // 在画布上画图片
    const drawImage = () => {
      cvsContext.globalCompositeOperation = 'source-over'
      cvsContext.beginPath()
      const timer = window.setTimeout(() => {
          cvsContext.drawImage(imgObj, 0, 0, width, height)
          cvsContext.closePath()
          cvsContext.globalCompositeOperation = 'destination-over'
          clearTimeout(timer)
          calWhite()
        }, 40)
    }
    // 计算图片中原本就存在的空白点
    const calWhite = () => {
      try {
        const pixelData = cvsContext.getImageData(
          0,
          0,
          width,
          height
        )
        let num = 0
        for (let i = 0; i < pixelData.data.length; i++) {
          if (pixelData.data[i] === 0) {
            num++
          }
        }
        imgWhiteNum = num
      } catch (e) {
        console.log('计算图片空白区域出错')
      }
    }
    // 刮的canvas操作
    const fillWhite = (offsetX: number, offsetY: number) => {
      cvsContext.globalCompositeOperation = 'destination-out'
      cvsContext.beginPath()
      cvsContext.fillStyle = '#f00'

      cvsContext.arc(offsetX, offsetY, 40, 0, Math.PI * 2)

      cvsContext.fill()
      cvsContext.closePath()
    }
    const startHandler = (e: TouchEvent) => {
      if (props.isPlaying) return
      // 如何改变父级的元素？？
      emit('update:isPlaying', true)
      // 开始刮
      if (props.touchStartAct) {
        props.touchStartAct()
      }
      const offX = e.touches[0].clientX
      const offY = e.touches[0].clientY
      fillWhite(offX - cvsBoxInfo.left, offY - cvsBoxInfo.top)
    }
    const moveHandler = (e: TouchEvent) => {
      // 刮过程中要做的事情
      e.preventDefault()
      if (
        window.navigator &&
        window.navigator.userAgent.indexOf('534.30') > 0
      ) {
        // Tweak the canvas opacity, causing it to redraw
        dom.style.opacity = '0.99'
        // Set the canvas opacity back to normal after 5ms
        setTimeout(() => {
          dom.style.opacity = '1'
        }, 5)
      }
      const offX = e.touches[0].clientX
      const offY = e.touches[0].clientY
      fillWhite(offX - cvsBoxInfo.left, offY - cvsBoxInfo.top)
    }
    const endHandler = (e: TouchEvent | MouseEvent) => {
      // 刮完之后要做的事
      mouseDown = false
      if (!props.isPlaying) return
      e.preventDefault()

      let num = 0
      let percent

      try {
        // 计算刮刮卡总像素点
        const pixelData = cvsContext.getImageData(
          0,
          0,
          cvsBoxInfo.width,
          cvsBoxInfo.height
        )

        // 计算刮开区域像素点
        for (let i = 0; i < pixelData.data.length; i++) {
          if (pixelData.data[i] === 0) {
            num++
          }
        }

        // 计算刮开百分比
        percent = scratchedRate =
          (num - imgWhiteNum) / (pixelData.data.length - imgWhiteNum)
      } catch (e) {
        percent = props.targetRate
      }

      // 百分比 <= 0.3 ,刮刮卡展开再出券
      // 百分比 > 0.3, 刮刮卡直接出券
      // 刮完之前要做的事
      if (percent < props.targetRate && props.autoPlay) {
        setTimeout(() => {
          autoPlay().then(() => {
            props.touchEndAct && props.touchEndAct()
          })
        }, 1000)
      } else {
        props.touchEndAct && props.touchEndAct()
      }
    }
    const mouseStartHandler = (e: MouseEvent) => {
      // 鼠标开始事件
      mouseDown = true
      const offX = e.offsetX
      const offY = e.offsetY
      fillWhite(offX, offY)
    }
    const mouseMoveHandler = (e: MouseEvent) => {
      // 鼠标移动事件
      if (mouseDown) {
        e.preventDefault()
        cvsContext.beginPath()
        cvsContext.fillStyle = '#f00'
        cvsContext.arc(e.offsetX, e.offsetY, 40, 0, Math.PI * 2)
        cvsContext.fill()
        cvsContext.closePath()
      }
    }
    // 自动刮
    const autoPlay = () => {
      const points = props.autoPoints as Array<Array<number>>
      const arr = new Array() // 数组类型如何定义？？
      for (let i = 0; i < points.length - 1; i++) {
        arr.push(
          tween({
            from: {
              x: points[i][0],
              y: points[i][1]
            },
            to: {
              x: points[i + 1][0],
              y: points[i + 1][1]
            },
            duration: 0.25
          })
        )
      }
      return new Promise(resolve => {
        chain(...arr).start({
          update: v => {
            fillWhite(v.x, v.y)
          },
          complete: () => {
            isDone()
            resolve()
          }
        })
      })
    }
    // 刮刮卡全部刮开
    const isDone = () => {
      cvsContext.fillRect(0, 0, width, height)
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
        onMousemove={mouseMoveHandler}
        onMouseup={endHandler}
      ></canvas>
    }
  }
})
