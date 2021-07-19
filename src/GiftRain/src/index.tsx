import Vue, { PropType } from "vue";
import Gift from "./gift";
import { ImageProps, GiftProps, ImageState } from "./types"
import { randomRound } from "../../utils";

let canvas: HTMLCanvasElement
let canvasCtx: CanvasRenderingContext2D
// 红包实例对象
let giftInstance: Gift
// 资源图片元素列表
let imageEleArr: ImageProps[] = []
let totalGiftArr: GiftProps[] = []
let imageStyle: ImageState[] = []

export default Vue.extend({
  name: "mk-gift-rain",

  props: {
    // 红包的图片资源src列表
    imgSource: {
      type: Array as PropType<Array<string>>,
      default: () => ([])
    }
  },

  data: () => ({
    component: "mk-gift-rain",
    canvasWidth: 552,
    canvasHeight: 338,
    canvas,
    canvasCtx,
    giftInstance,
    imageEleArr,
    totalGiftArr,
    imageStyle
  }),

  methods: {
    // 获取canvas父容器的宽高
    getCanvasParentRect() {
      const canvasParent = this.canvas?.parentElement
      const parentRect = canvasParent?.getBoundingClientRect()
      return {
        width: parentRect?.width || this.canvasWidth,
        height: parentRect?.height || this.canvasHeight
      }
    },
    // 初始化canvas状态
    initCanvas() {
      this.canvas = document.getElementById('gift') as HTMLCanvasElement
      this.canvasCtx = this.canvas.getContext("2d") as CanvasRenderingContext2D
      const { width, height } = this.getCanvasParentRect()
      this.canvasHeight = height
      this.canvasWidth = width
      // 红包图片资源信息
      this.totalGiftArr = this.imageEleArr.map((item, index) => {
        const newItem = Object.assign({
          width: item.imageWidth,
          height: item.imageHeight,
          source: item.image
        }, this.imageStyle[index])
        return newItem
      })
      // 创建红包实例
      this.giftInstance = new Gift(
        this.totalGiftArr,
        {
          context: this.canvasCtx,
          width: this.canvasWidth,
          height: this.canvasHeight
        },
        this.imageEleArr
      )
    },
    // 开启红包雨
    start() {
      this.giftInstance.start()
    },
    // 停止红包雨
    stop() {
      this.giftInstance.stop()
    },
    // 异步缓存需要绘制的图片资源
    loadImgs(arr: string[]): Promise<void> {
      return new Promise((resolve, reject) => {
        let count = 0 // 用于判断图片是否全部加载完成
        const len = arr.length
        for (let i = 0; i < len; i++) {
          const image = new Image()
          image.src = arr[i]
          image.onload = (e) => {
            count++
            const { width, height } = image
            this.imageEleArr.push({
              image,
              imageWidth: width,
              imageHeight: height
            })
            if (count === len) { // 加载完成
              resolve()
            }
          }
          image.onerror = (e) => {
            reject(arr[i])
          }
        }
      })
    },
    // 初始化对应个数的红包实例位置信息
    initRedInstanceState(len: number): ImageState[] {
      const randomStateList = []
      for (let j = 0; j < len; j++) {
        const newState = {
          x: randomRound(15, 200),
          y: randomRound(-100, 0),
          speed: randomRound(1, 8)
        }
        randomStateList.push(newState)
      }
      return randomStateList
    },
  },

  created() {
    // 预加载并缓存图片资源
    this.loadImgs(this.imgSource)
    const len = this.imgSource.length
    // 初始化位置信息
    this.imageStyle = this.initRedInstanceState(len)
  },

  mounted() {
    this.$nextTick(() => {
      // 异步初始化canvas实例
      setTimeout(() => {
        this.initCanvas()
      }, 100)
    })
  },

  render() {
    return (
      <canvas id="gift" width={this.canvasWidth} height={this.canvasHeight}></canvas>
    )
  }
})
