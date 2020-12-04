import { tween, chain, Action } from 'popmotion'
import { TweenInterface } from 'popmotion/lib/animations/tween/types'
import { ValueMap } from 'popmotion/lib/reactions/value'

export class PaintBrush {
  cvsContext: CanvasRenderingContext2D
  width: number // 画布的宽度
  height: number // 画布的高度
  cvsBoxInfo: DOMRect // canvas元素相对于视窗的属性

  constructor(dom: HTMLCanvasElement, width: number, height: number) {
    this.cvsContext = dom.getContext('2d') as CanvasRenderingContext2D
    this.width = width
    this.height = height
    this.cvsBoxInfo = dom.getBoundingClientRect()
  }

  fillWhite(offsetX: number, offsetY: number) {
    this.cvsContext.globalCompositeOperation = 'destination-out'
    this.cvsContext.beginPath()
    this.cvsContext.fillStyle = '#f00'
    // offsetX、 offsetY，圆心的坐标
    this.cvsContext.arc(offsetX, offsetY, 20, 0, Math.PI * 2)
    this.cvsContext.fill()
    this.cvsContext.closePath()
  }
  getPixelDate(width: number, height: number) {
    return this.cvsContext.getImageData(0, 0, width, height).data
  }
  // 计算空白区域的像素点数
  calWhite(width: number, height: number) {
    try {
      const pixelData = this.getPixelDate(width, height)
      let num = 0
      for (let i = 0; i < pixelData.length; i++) {
        if (pixelData[i] === 0) {
          num++
        }
      }
      return num
    } catch (e) {
      console.log('计算图片空白区域出错')
    }
  }
  // 往canvas上画图片 TODO考虑图片与画布大小不一致的情况
  drawImage = (imgObj: CanvasImageSource) => {
    return new Promise((resolve, reject) => {
      try {
        this.cvsContext.globalCompositeOperation = 'source-over'
        this.cvsContext.beginPath()
        const timer = window.setTimeout(() => {
          this.cvsContext.drawImage(imgObj, 0, 0, this.width, this.height)
          this.cvsContext.closePath()
          this.cvsContext.globalCompositeOperation = 'destination-over'
          clearTimeout(timer)
          resolve()
        }, 40)
      } catch (e) {
        reject(e)
      }
    })
  }
  // 画颜色
  drawColor = (color: string) => {
    this.cvsContext.fillStyle = color
    this.cvsContext.fillRect(0, 0, this.width, this.height)
  }
  touchActive = (e: TouchEvent) => {
    const offX = e.touches[0].clientX - this.cvsBoxInfo.left
    const offY = e.touches[0].clientY - this.cvsBoxInfo.top
    this.fillWhite(offX, offY)
  }
  // 自动刮
  autoPlay = (points: Array<Array<number>>) => {
    const arr: Array<Action<TweenInterface<number>>> = []
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
          duration: 250
        })
      )
    }
    return new Promise(resolve => {
      chain(...arr).start({
        update: (v: ValueMap) => {
          this.fillWhite(Number(v.x), Number(v.y))
        },
        complete: () => {
          this.cvsContext.fillRect(0, 0, this.width, this.height)
          resolve()
        }
      })
    })
  }
}

// 如果传入的是一个图片地址，创建图片对象
export const createImgObj = (src: string) => {
  const imgObj = new Image()
  imgObj.src = src
  imgObj.crossOrigin = 'anonymous'
  imgObj.onerror = () => {
    imgObj.src =
      'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAArEAAAGSAQMAAADOxAtrAAAAA1BMVEWXl5cPTYmVAAAAOUlEQVR42u3BgQAAAADDoPtT32AE1QAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABIB4owAAGsmJ4nAAAAAElFTkSuQmCC'
    imgObj.onerror = null
  }
  return imgObj
}
