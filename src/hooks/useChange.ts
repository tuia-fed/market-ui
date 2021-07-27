import { animate, linear, cubicBezier } from "popmotion";

export type OnUpdate = (activeIndex: number) => void;

export interface InitOptions {
  onUpdate: OnUpdate; // 动画结束之后的更新回调
  idledSpeed?: number; // 空转时的速率
  runSpeed?: number; // 运行时的速率
  rows: number; // 转盘的行数，根据行数渲染成包含 `rows * rows` 格子的转盘
}

export interface StopOptions {
  index: number;
  duration?: number;
  complete: () => void;
}

// 最终改变的是选中奖品index索引的位置
export class Change {
  private onUpdate: OnUpdate;
  private activeIndex: number;
  private tw:
    | {
        stop: () => void;
      }
    | undefined;
  private runSpeed: number;
  private prizeNum: number; // 总奖品数量
  private idledSpeed: number;

  constructor(initOptions: InitOptions) {
    this.onUpdate = initOptions.onUpdate;
    this.activeIndex = 0; // 初始化索引在第一个奖品
    this.runSpeed = initOptions?.runSpeed || 120;
    this.idledSpeed = initOptions?.idledSpeed || 650;
    const rows = initOptions.rows;
    this.prizeNum = Math.pow(rows, 2) - Math.pow(rows - 2, 2); // 奖品分布在转盘的最外层个数
  }

  /**
   * 开始切换状态
   */
  start(): void {
    this.stop();
    this.reset();
    const leftIndexNums = this.prizeNum - this.activeIndex; // 需要切换的位置数量
    this.tw = animate({
      from: this.activeIndex,
      to: this.activeIndex + leftIndexNums,
      duration: this.runSpeed * leftIndexNums,
      ease: linear,
      repeat: Infinity,
      onUpdate: (index: number) => {
        // 动画更新的回调
        this.activeIndex = Math.floor(index); // 更新选中的索引
        this.onUpdate(Math.floor(index));
      },
    });
  }

  /**
   * 切换到目标位置
   */
  toChange(data: StopOptions) {
    this.stop();
    // 目标索引位置,需要先空转两圈
    const targetIndex =
      this.activeIndex +
      2 * this.prizeNum +
      (this.prizeNum - this.activeIndex) +
      data.index;

    this.tw = animate({
      from: this.activeIndex,
      to: targetIndex,
      duration: data.duration || 1000,
      ease: cubicBezier(0.33, 1, 0.68, 1),
      onUpdate: (index: number) => {
        // 动画更新的回调
        this.activeIndex = Math.floor(index); // 更新选中的索引
        this.onUpdate(Math.floor(index));
      },
      onComplete: () => {
        this.reset();
        data.complete();
      },
    });
  }

  // 闲置状态空转
  idled() {
    this.stop();
    this.tw = animate({
      from: this.activeIndex,
      to: this.prizeNum,
      duration: this.idledSpeed * this.prizeNum,
      ease: linear,
      repeat: Infinity,
      onUpdate: (index: number) => {
        this.activeIndex = Math.floor(index);
        this.onUpdate(Math.floor(index));
      },
    });
  }

  // 停止切换
  stop() {
    this.tw?.stop();
  }

  // 重置索引状态数据
  reset() {
    this.activeIndex = 0;
  }
}

export default function useChange(initOptions: InitOptions) {
  return new Change(initOptions);
}
