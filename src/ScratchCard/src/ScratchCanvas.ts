import { SizeType } from 'types/Core';
import { downloadDomImage } from '../../utils';
import { animate } from 'popmotion';
import { PopmotionType } from '../../../types/Core';

export interface ScratchCanvasPropsType {
  // Canvas
  canvas: HTMLCanvasElement;
  // 刮刮卡封面图片
  coverImg?: string;
  // 刮刮卡封面兜底颜色
  coverColor: string;
  // 刮的刷子宽高
  brushSize?: SizeType;
  // 刮的刷子图片
  brushImg?: string;
  // 刮的刷子兜底圆圈半径
  brushRadius: number;
  // 开始刮回调
  scratchStart?: () => void;
  // 结束刮回调
  scratchEnd?: () => void;
}

interface EventType {
  clientX: number;
  clientY: number;
}

interface PosType {
  x: number;
  y: number;
}

export default class ScratchCanvas {
  canvas!: HTMLCanvasElement;
  ctx!: CanvasRenderingContext2D;
  coverImg?: string;
  coverColor = '#c5c5c5';
  brushSize?: SizeType;
  brushImg?: string;
  brushRadius = 40;
  scratchStart?: () => void;
  scratchEnd?: () => void;
  // 缓存封面图片
  coverHtmlImg?: HTMLImageElement;
  // 缓存刷子图片
  brushHtmlImg?: HTMLImageElement;
  canUserScratch = true;
  isDrawing = false;
  lastDrawPos?: PosType;
  autoAni?: PopmotionType;

  constructor(props: ScratchCanvasPropsType) {
    Object.assign(this, props);
    this.ctx = this.canvas.getContext('2d') as CanvasRenderingContext2D;
  }

  async init() {
    const [cover, brush] = await Promise.all([
      this.coverImg ? downloadDomImage(this.coverImg) : undefined,
      this.brushImg ? downloadDomImage(this.brushImg) : undefined,
    ]);
    this.coverHtmlImg = cover;
    this.brushHtmlImg = brush;
    if (brush && !this.brushSize) {
      this.brushSize = {
        width: brush.width,
        height: brush.height,
      };
    }
    this.canvas.addEventListener('touchstart', this.onTouchStart.bind(this));
    this.canvas.addEventListener('mousedown', this.onTouchStart.bind(this));
    this.canvas.addEventListener('touchmove', this.onTouchMove.bind(this));
    this.canvas.addEventListener('mousemove', this.onTouchMove.bind(this));
    this.canvas.addEventListener('touchend', this.onTouchEnd.bind(this));
    this.canvas.addEventListener('touchcancel', this.onTouchEnd.bind(this));
    window.addEventListener('mouseup', this.onTouchEnd.bind(this));
    this.reset();
  }

  setUserScratchEnable(v: boolean) {
    this.canUserScratch = v;
  }

  onTouchStart(e: TouchEvent | MouseEvent) {
    if (!this.canUserScratch) {
      return;
    }
    e.preventDefault();
    this.isDrawing = true;
    this.drawBrushWithEvent(e);
    this.scratchStart && this.scratchStart();
  }

  onTouchMove(e: TouchEvent | MouseEvent) {
    if (this.isDrawing) {
      e.preventDefault();
      this.drawBrushWithEvent(e);
    }
  }

  onTouchEnd(e: TouchEvent | MouseEvent) {
    if (this.isDrawing) {
      e.preventDefault();
      this.isDrawing = false;
      this.lastDrawPos = undefined;
      this.scratchEnd && this.scratchEnd();
    }
  }

  reset() {
    this.isDrawing = false;
    this.lastDrawPos = undefined;
    if (this.autoAni) {
      this.autoAni.stop();
      this.autoAni = undefined;
    }
    this.drawCover();
  }

  drawCover() {
    this.ctx.globalCompositeOperation = 'source-over';
    const { width, height } = this.canvas;
    if (this.coverHtmlImg) {
      this.ctx.drawImage(this.coverHtmlImg, 0, 0, width, height);
    } else {
      console.log('xx', this.ctx);
      this.ctx.fillStyle = this.coverColor;
      this.ctx.fillRect(0, 0, width, height);
    }
  }

  drawBrushWithEvent(e: TouchEvent | MouseEvent) {
    let event: EventType;
    if ((<TouchEvent>e).touches) {
      event = (<TouchEvent>e).touches[0];
    } else {
      event = <MouseEvent>e;
    }
    if (event) {
      const { clientX, clientY } = event;
      const rect = this.canvas.getBoundingClientRect();
      const px = (clientX - rect.left) * (this.canvas.width / rect.width);
      const py = (clientY - rect.top) * (this.canvas.height / rect.height);
      this.drawBrushOpt(px, py);
    }
  }

  drawBrushOpt(px: number, py: number) {
    if (!this.lastDrawPos) {
      this.drawBrush(px, py);
    } else {
      const { x, y } = this.lastDrawPos;
      const dis = Math.sqrt(Math.pow(py - y, 2) + Math.pow(px - x, 2));
      for (let i = 0; i < dis; i++) {
        this.drawBrush(x + ((px - x) * i) / dis, y + ((py - y) * i) / dis);
      }
    }
    this.lastDrawPos = { x: px, y: py };
  }

  drawBrush(px: number, py: number) {
    this.ctx.globalCompositeOperation = 'destination-out';
    if (this.brushHtmlImg && this.brushSize) {
      const { width, height } = this.brushSize;
      this.ctx.drawImage(
        this.brushHtmlImg,
        px - width / 2,
        py - height / 2,
        width,
        height
      );
    } else {
      this.ctx.beginPath();
      this.ctx.fillStyle = '#FFFFFF';
      this.ctx.arc(px, py, this.brushRadius, 0, 2 * Math.PI);
      this.ctx.fill();
    }
  }

  getEmptyPercent(rect: number[]) {
    const { width, height } = this.canvas;
    const imageData = this.ctx.getImageData(
      rect[0] * width,
      rect[1] * height,
      rect[2] * width,
      rect[3] * height
    );
    let empty = 0;
    const total = imageData.data.length;
    imageData.data.forEach((it) => {
      if (it === 0) {
        empty++;
      }
    });
    return total > 0 ? empty / total : 1;
  }

  runOnePath(time: number, onUpdate: (v: number) => void): Promise<void> {
    this.autoAni && this.autoAni.stop();
    return new Promise((resolve, reject) => {
      this.autoAni = animate({
        from: 0,
        to: 1,
        duration: time,
        onStop: () => reject('被停止'),
        onUpdate,
        onComplete: resolve,
      });
    });
  }

  async scratchWithPath(path: number[][]) {
    this.lastDrawPos = undefined;
    const len = path.length;
    const { width, height } = this.canvas;
    for (let i = 1; i < len; i++) {
      const lastPos = path[i - 1];
      const nowPos = path[i];
      await this.runOnePath(nowPos[2] || 250, (v) => {
        this.drawBrushOpt(
          (v * (nowPos[0] - lastPos[0]) + lastPos[0]) * width,
          (v * (nowPos[1] - lastPos[1]) + lastPos[1]) * height
        );
      });
    }
  }
}
