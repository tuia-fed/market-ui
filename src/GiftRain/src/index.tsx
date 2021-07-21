import Vue, { PropType } from "vue";
import Gift from "./gift";
import { ImageProps, GiftProps, ImageState, FrameProps } from "./types";
import { randomRound } from "../../utils";

let canvas: HTMLCanvasElement;
let canvasCtx: CanvasRenderingContext2D;
// 红包实例对象
let giftInstance: Gift;
// 资源图片元素列表
let imageEleArr: ImageProps[] = [];
let totalGiftArr: GiftProps[] = [];
let imageStyle: ImageState[] = [];
let frameImageEle: ImageProps; // 帧动画图片实例

export default Vue.extend({
  name: "mk-gift-rain",

  props: {
    // 红包的图片资源src列表
    imgSource: {
      type: Array as PropType<Array<string>>,
      default: () => [],
      required: true
    },
    // 红包点击打开之后的帧动画资源
    giftOpenFrame: {
      type: Object as PropType<FrameProps>,
      required: true
    },
  },

  data: () => ({
    component: "mk-gift-rain",
    // canvas尺寸
    canvasWidth: 552,
    canvasHeight: 338,
    // canvas容器距离窗口顶端的距离
    canvasToBodyTop: 0,
    canvas,
    canvasCtx,
    giftInstance,
    imageEleArr,
    frameImageEle,
    totalGiftArr,
    imageStyle,
  }),

  methods: {
    // 获取canvas父容器的宽高
    getCanvasParentRect() {
      const canvasParent = this.canvas?.parentElement;
      const parentRect = canvasParent?.getBoundingClientRect();
      return {
        width: parentRect?.width || this.canvasWidth,
        height: parentRect?.height || this.canvasHeight,
        top: parentRect?.top || 0,
      };
    },
    // 初始化canvas状态
    initCanvas() {
      this.canvas = document.getElementById("gift") as HTMLCanvasElement;
      this.canvasCtx = this.canvas.getContext("2d") as CanvasRenderingContext2D;
      const { width, height, top } = this.getCanvasParentRect();
      this.canvasHeight = height;
      this.canvasWidth = width;
      this.canvasToBodyTop = top;
      // 红包图片资源信息
      this.totalGiftArr = this.imageEleArr.map((item, index) => {
        const newItem = Object.assign(
          {
            width: item.imageWidth,
            height: item.imageHeight,
            source: item.image,
          },
          this.imageStyle[index]
        );
        return newItem;
      });
      // 创建红包实例
      this.giftInstance = new Gift(
        this.totalGiftArr,
        {
          context: this.canvasCtx,
          width: this.canvasWidth,
          height: this.canvasHeight,
          top: this.canvasToBodyTop,
        },
        this.imageEleArr,
        this.frameImageEle,
        this.giftOpenFrame.amount
      );
    },
    // 开启红包雨
    start() {
      this.giftInstance.start();
    },
    // 停止红包雨
    stop() {
      this.giftInstance.stop();
    },
    // 异步缓存需要绘制的图片资源
    loadImgs(arr: string[]): Promise<void> {
      return new Promise((resolve, reject) => {
        let count = 0; // 用于判断图片是否全部加载完成
        const len = arr.length;
        for (let i = 0; i < len; i++) {
          const image = new Image();
          image.src = arr[i];
          image.onload = (e) => {
            count++;
            const { width, height } = image;
            const imageObj = {
              image,
              imageWidth: width,
              imageHeight: height,
            };
            // 排除帧动画图片元素
            if (arr[i] !== this.giftOpenFrame.url) {
              this.imageEleArr.push(imageObj);
            } else {
              // 获取帧动画图片元素
              this.frameImageEle = { ...imageObj };
            }
            if (count === len) {
              // 加载完成
              resolve();
            }
          };
          image.onerror = (e) => {
            reject(arr[i]);
          };
        }
      });
    },
    // 初始化对应个数的红包实例位置信息
    initRedInstanceState(len: number): ImageState[] {
      const randomStateList = [];
      const multiple = Math.floor(200 / len);
      for (let j = 0; j < len; j++) {
        const newState = {
          x: multiple * j + 15,
          y: randomRound(-100, 0),
          speed: randomRound(1, 8),
        };
        randomStateList.push(newState);
      }
      return randomStateList;
    },
    // 在canvas上绑定click事件、获取点击位置信息、根据鼠标信息和红包所在位置判断红包是否被点击
    handleTouchCanvas(e: MouseEvent) {
      this.giftInstance
        .getTouchLocation(e.clientX, e.clientY)
        .then((amount) => {
          // 向上分发红包拆开事件,参数为红包拆开的总个数
          this.$emit("openGift", amount);
        });
    },
  },

  created() {
    const len = this.imgSource.length;
    // 初始化位置信息
    this.imageStyle = this.initRedInstanceState(len);
  },

  mounted() {
    // 预加载并缓存图片资源
    this.loadImgs([...this.imgSource, this.giftOpenFrame.url]).then(() => {
      // 异步实例化canvas
      this.initCanvas();
    });
  },

  render() {
    return (
      <canvas
        id="gift"
        width={this.canvasWidth}
        height={this.canvasHeight}
        onClick={this.handleTouchCanvas}
      ></canvas>
    );
  },
});
