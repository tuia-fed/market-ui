import { animate, linear, cubicBezier } from "popmotion";

export type OnUpdate = (angle: number) => void;

export interface ToProps {
  index?: number;
  to?: number;
  duration?: number;
  complete: () => void;
}

function getAngleRangeByIndex(index: number) {
  return [0 - 60 * index, 60 - 60 * index];
}

export class Rotate {
  private onUpdate: OnUpdate;
  private angle: number;
  private tw:
    | {
        stop: () => void;
      }
    | undefined;

  constructor(onUpdate: OnUpdate) {
    this.onUpdate = onUpdate;
    this.angle = 0;
  }

  /**
   * 闲置状态空转
   */
  idled() {
    this.stop();
    this.tw = animate({
      from: this.angle,
      to: this.angle + 360,
      duration: 10000,
      ease: linear,
      repeat: Infinity,
      onUpdate: (angle) => {
        this.angle = angle;
        this.onUpdate(angle);
      },
    });
  }

  /**
   * 开始抽奖
   */
  start() {
    this.stop();
    this.tw = animate({
      from: this.angle,
      to: this.angle + 360,
      duration: 500,
      ease: linear,
      repeat: Infinity,
      onUpdate: (angle) => {
        this.angle = angle;
        this.onUpdate(angle);
      },
    });
  }

  /**
   * 转到中奖结果处
   * @param data - 抽奖结果
   */
  to(data: ToProps) {
    this.stop();
    let to = 0;

    if (data.to !== undefined) {
      to = data.to;
    } else if (data.index !== undefined) {
      if (data.index < 0 || data.index > 6) throw Error("index 范围 0-5");
      const angles = getAngleRangeByIndex(data.index);
      to = (angles[0] + angles[1]) / 2;
    }

    this.tw = animate({
      from: this.angle,
      to: this.angle + 360 * 2 - (this.angle % 360) + to,
      duration: data.duration || 1000,
      ease: cubicBezier(0.33, 1, 0.68, 1),
      onUpdate: (angle) => {
        this.angle = angle;
        this.onUpdate(angle);
      },
      onComplete: () => {
        data.complete();
      },
    });
  }

  /**
   * 停止转动
   */
  stop() {
    this.tw?.stop();
  }
}

export default function useRotate(onUpdate: OnUpdate) {
  return new Rotate(onUpdate);
}
