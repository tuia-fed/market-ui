import {
  GiftProps,
  CanvasProps,
  ImageProps,
  ClientPosition,
  BubbleState,
} from "./types";
import { randomRound } from "../../utils";
import { giftRainConfig } from "./config";

type BoomPosition = Omit<BubbleState, "index">;

/** 用于动态创建红包🧧实例 */
export default class Gift {
  private ctx: CanvasRenderingContext2D; // canvas上下文
  private canvasWidth: number; // 画布的宽
  private canvasHeight: number; // 画布的高
  private canvasTop: number; // 画布容器的top
  private animationFrameTimer: number; // requestAnimationFrame执行监听器
  private ratio: number; // 红包图片绘制到画布上的缩放比例
  private coinList: GiftProps[]; // 需要渲染的红包列表
  private initCoinList: GiftProps[];
  private imageList: ImageProps[]; // 红包图片实例列表
  private frameImage: ImageProps; // 帧动画图片实例
  private frameAmount: number; // 帧动画图片的帧数
  private frameTimer: number; // 帧执行监听器
  private addCoinTimer: ReturnType<typeof setTimeout>;
  private clickPosition: ClientPosition; // 鼠标点击位置
  public giftCount: number; // 击中的红包数量

  /** 初始化参数，红包属性+context+红包图片实例 */
  constructor(
    options: GiftProps[],
    canvas: CanvasProps,
    imageList: ImageProps[],
    frameImage: ImageProps,
    frameAmount: number
  ) {
    this.coinList = options;
    this.initCoinList = options;

    this.ctx = canvas.context;
    this.canvasWidth = canvas.width;
    this.canvasHeight = canvas.height;
    this.canvasTop = canvas.top;

    this.animationFrameTimer = 0;
    this.frameTimer = 0;
    this.addCoinTimer = 0;
    this.ratio = 0.5;

    this.imageList = imageList;
    this.frameImage = frameImage;
    this.frameAmount = frameAmount;

    this.clickPosition = {
      clientX: 0,
      clientY: 0,
    };
    this.giftCount = 0;
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
      // 不断执行绘制，形成红包动画,requestAnimationFrame用于每一帧开始执行回调
      this.animationFrameTimer = window.requestAnimationFrame(frame);
    };
    this.animationFrameTimer = window.requestAnimationFrame(frame);
  }

  /** 随机生成红包 */
  createGift() {
    const random = randomRound(1, giftRainConfig.renderGiftCount);
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
        speed: randomRound(1, giftRainConfig.giftMaxSpeed),
        width: imageWidth,
        height: imageHeight,
      };
      coinArr.push(newRandomCoin);
    }
    this.coinList = [...this.coinList, ...coinArr];
    // 定时创建一批新的金币对象插入到数组
    this.addCoinTimer = setTimeout(() => {
      this.createGift();
    }, giftRainConfig.renderTimeout);
  }

  /** 获取canvas容器点击位置 */
  getTouchLocation(x: number, y: number): Promise<number> {
    return new Promise((resolve) => {
      this.clickPosition.clientX = x;
      this.clickPosition.clientY = y;
      // 存储所有点中的红包
      const clickedCoins: BubbleState[] = [];
      // 判断画布上的红包是否被点击
      this.coinList.forEach((coin: GiftProps, index: number) => {
        if (this.isCoinIntersect(this.clickPosition, coin)) {
          clickedCoins.push({
            x: coin.x,
            y: coin.y,
            index,
          });
        }
      });
      // 击中了重叠的红包，只取最上面一个红包
      if (clickedCoins.length) {
        const { x, y, index } = clickedCoins[0];
        // 记录点击的红包个数
        this.giftCount++;
        // 将该红包对象移除
        this.coinList.splice(index, 1);
        // 绘制红包消除帧动画效果
        this.drawFrameWithCanvas(this.frameImage, this.frameAmount, { x, y });
        resolve(this.giftCount);
      }
    });
  }

  /**
   * 绘制帧动画
   * @param {Object} ctx-canvas绘制上下文
   * @param {Object} image-绘制的帧动画图片对象
   * @param {Number} framesAmount-帧动画的帧数
   */
  drawFrameWithCanvas(
    img: ImageProps,
    framesAmount: number,
    boomPosition: BoomPosition
  ) {
    let index = 0;
    // 目前只针对只有一行的帧动画图片，一帧的高度=原图的高度
    const oneFrameWidth = img.imageWidth / framesAmount;
    const oneFrameHeight = img.imageHeight;
    const frame = () => {
      // 绘制红包的时候已经清除画布，重复清除会造成画布闪烁
      // this.ctx.clearRect(0, 0, this.canvasWidth, this.canvasHeight);
      // 裁剪帧动画图片资源的每一帧来实现帧动画的绘制
      this.ctx.drawImage(
        img.image,
        index * oneFrameWidth,
        0,
        oneFrameWidth,
        oneFrameHeight,
        boomPosition.x,
        boomPosition.y,
        oneFrameWidth,
        oneFrameHeight
      );
      index++;
      this.frameTimer = window.requestAnimationFrame(frame);
      // 绘制到最后一帧停止渲染帧动画
      if (index >= framesAmount) {
        window.cancelAnimationFrame(this.frameTimer);
      }
    };
    this.frameTimer = window.requestAnimationFrame(frame);
  }

  /** 红包【矩形碰撞检测】 */
  isCoinIntersect(position: ClientPosition, coin: GiftProps): boolean {
    const coinRealW = coin.width * this.ratio;
    const coinRealH = coin.height * this.ratio;
    const isWithinX =
      position.clientX >= coin.x && position.clientX <= coin.x + coinRealW;
    // 因为clientY是相对于窗口的，需要减去canvas容器的top高度值
    const isWithinY =
      position.clientY >= coin.y &&
      position.clientY - this.canvasTop <= coin.y + coinRealH;
    return isWithinX && isWithinY;
  }

  /** 开始红包动画 */
  start() {
    // 初始化随机红包图片缩放比例
    this.ratio =
      randomRound(giftRainConfig.minScaleRatio, giftRainConfig.maxScaleRatio) /
      10;
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
