import Vue, { PropType, VNode } from "vue";
import { StyleObject } from "./options";

export default Vue.extend({
  name: "mk-sudoku-container",

  props: {
    // 容器样式
    containerStyle: {
      type: Object as PropType<StyleObject>,
      default: () => ({}),
    },
    // 宫格一行包含的奖品数量
    rowsAmount: {
      type: Number,
      default: 0,
    },
    // 一个奖品对应的宽高尺寸
    cubeSize: {
      type: Number,
      default: 0,
    },
  },

  render(): VNode {
    // 整体的九宫格奖品布局划分为上、右、下、左四个区域的位置，内部采用flex布局来布局奖品
    // 刚好按照顺时针方向，奖品的索引先后顺序进行布局
    const topCal = this.cubeSize * this.rowsAmount;
    const topStyle = { width: `${topCal}px`, height: `${this.cubeSize}px` };
    const rightCal = (this.rowsAmount - 2) * this.cubeSize;
    const rightStyle = {
      width: `${this.cubeSize}px`,
      height: `${rightCal}px`,
      top: `${this.cubeSize}px`,
    };
    const centerStyle = {
      width: `${rightCal}px`,
      height: `${rightCal}px`,
      left: `${this.cubeSize}px`,
      top: `${this.cubeSize}px`,
    };

    return (
      <div class="mk-sudoku-container" style={this.containerStyle}>
        {/* 奖品的分布，上右下左 */}
        <div class="mk-sudoku-container__top" style={topStyle}>
          {this.$slots.top}
        </div>
        <div class="mk-sudoku-container__right" style={rightStyle}>
          {this.$slots.right}
        </div>
        <div class="mk-sudoku-container__bottom" style={topStyle}>
          {this.$slots.bottom}
        </div>
        <div class="mk-sudoku-container__left" style={rightStyle}>
          {this.$slots.left}
        </div>
        {/* 用户操作九宫格运行的区域 */}
        <div class="mk-sudoku-container__action" style={centerStyle}>
          {this.$slots.action}
        </div>
      </div>
    );
  },
});
