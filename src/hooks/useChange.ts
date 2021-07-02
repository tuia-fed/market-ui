import { animate } from "popmotion";
import { AnimationOptions } from "popmotion/lib/animations/types";

export type OnUpdate = (activeIndex: number) => void;

export interface InitOptions {
  onUpdate: OnUpdate; // 动画结束之后的更新回调
  idledSpeed: number; // 空转时的速率
  runSpeed: number; // 运行时的速率
  rows: number; // 转盘的行数，根据行数渲染成包含 `rows * rows` 格子的转盘
}

// 最终改变的是选中奖品index索引的位置
export class Change {
  private onUpdate: OnUpdate;
  private activeIndex: number;
  private tw: AnimationOptions<number> | undefined;
  private idledSpeed: number;
  private runSpeed: number;
  private prizeNum: number; // 总奖品数量

  constructor(initOptions: InitOptions) {
    this.onUpdate = initOptions.onUpdate;
    this.activeIndex = 0; // 初始化索引在第一个奖品
    this.idledSpeed = initOptions.idledSpeed;
    this.runSpeed = initOptions.runSpeed;
    const rows = initOptions.rows;
    this.prizeNum = Math.pow(rows, 2) - Math.pow(rows - 2, 2); // 奖品分布在转盘的最外层
  }
}
