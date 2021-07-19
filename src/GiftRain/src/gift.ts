import { GiftProps, CanvasProps, ImageProps } from "./types";
import { randomRound } from "../../utils";

/** 用于动态创建红包🧧实例 */
export default class Gift {
  private ctx: CanvasRenderingContext2D; // canvas上下文
  private canvasWidth: number; // 画布的宽
  private canvasHeight: number; // 画布的高
  private animationFrameTimer: number; // requestAnimationFrame执行监听器
  private ratio: number; // 红包图片绘制到画布上的缩放比例
  private coinList: GiftProps[]; // 需要渲染的红包列表
  private initCoinList: GiftProps[];
  private imageList: ImageProps[]; // 红包图片实例列表
  private addCoinTimer: ReturnType<typeof setTimeout>;

  /** 初始化参数，红包属性+context+红包图片实例 */
  constructor(options: GiftProps[], canvas: CanvasProps, image: ImageProps[]) {
    this.coinList = options;
    this.initCoinList = options;

    this.ctx = canvas.context;
    this.canvasWidth = canvas.width;
    this.canvasHeight = canvas.height;
    this.animationFrameTimer = 0;
    this.addCoinTimer = 0;
    this.ratio = 0.5;

    this.imageList = image;
  }

  /** 绘制红包-红包运动就是通过不停地调用此方法实现 */
  drawGift() {
    this.coinList.forEach((coin: GiftProps, index: number) => {
      const { source, x, y, width, height, speed } = coin;
      const newCoin = Object.assign(coin, {
        y: y + speed,
      });
      this.coinList.splice(index, 1, newCoin);
      this.ctx.drawImage(source, x, y, width * this.ratio, height * this.ratio);
    });
  }

  /** 移动红包 */
  moveGift() {
    const frame = () => {
      // 先清空画布
      this.ctx.clearRect(0, 0, this.canvasWidth, this.canvasHeight);
      // 绘制新一帧红包
      this.drawGift();
      // 完全掉落到画布之后就不再绘制
      // 不断执行绘制，形成红包动画,requestAnimationFrame用于每一帧开始执行回调
      this.animationFrameTimer = window.requestAnimationFrame(frame);
    };
    this.animationFrameTimer = window.requestAnimationFrame(frame);
  }

  /** 随机生成红包 */
  createGift() {
    const random = randomRound(1, 3);
    const len = this.imageList.length;
    const imageIndex = randomRound(0, len - 1);
    const windowWidth =
      document.documentElement.clientWidth || document.body.clientWidth;
    const coinArr = [];
    for (let i = 0; i < random; i++) {
      const { image, imageWidth, imageHeight } = this.imageList[imageIndex];
      const newRandomCoin = {
        x: randomRound(15, windowWidth - imageWidth * this.ratio),
        y: randomRound(-imageHeight * this.ratio, 0),
        source: image,
        speed: randomRound(1, 8),
        width: imageWidth,
        height: imageHeight,
      };
      coinArr.push(newRandomCoin);
    }
    this.coinList = [...this.coinList, ...coinArr];
    // 定时创建一批新的金币对象插入到数组
    this.addCoinTimer = setTimeout(() => {
      this.createGift();
    }, 600);
  }

  /** 开始红包动画 */
  start() {
    // 初始化随机红包图片缩放比例
    this.ratio = randomRound(3, 5) / 10;
    this.moveGift();
    this.createGift();
  }

  /** 取消红包运动动画 */
  stop() {
    // 清除定时器和帧动画事件监听器
    window.cancelAnimationFrame(this.animationFrameTimer);
    clearTimeout(this.addCoinTimer);
    // 初始化红包列表
    this.coinList = [...this.initCoinList];
    // 清空画布
    this.ctx.clearRect(0, 0, this.canvasWidth, this.canvasHeight);
  }
}
