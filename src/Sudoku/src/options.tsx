/**
 * 单个奖品选项组件，包含两种渲染方式，1是展示默认的图片，2是用户自定义渲染，同时确保为正常的九宫格UI，统一渲染成正方形元素
 */
import Vue, { VNode } from "vue";

export type StyleObject = {
  width: string;
  height: string;
  position?: string;
  backgroundColor?: string;
};

export default Vue.extend({
  name: "mk-sudoku-option",

  props: {
    // 奖品当前的原始索引;
    originalIndex: {
      type: Number,
      required: true,
    },
    // 当前高亮的索引
    activeIndex: {
      type: Number,
      required: true,
    },
    // 自定义渲染函数，返回的是DOM
    itemRender: {
      type: Function,
    },
    // 默认渲染时，传入的图片地址
    image: {
      type: String,
    },
    // 奖品的尺寸
    size: {
      type: Number,
      required: true,
    },
    // 奖品的个数
    cubeNum: {
      type: Number,
      required: true,
    },
    // 遮罩层图片，非必传，如果不传，则默认用低透明度的黑色遮罩
    maskImage: {
      type: String,
    },
    // 选项点击事件
    itemClick: {
      type: Function,
    },
  },

  computed: {
    optionStyle(): StyleObject {
      return {
        width: `${this.size}px`,
        height: `${this.size}px`,
      };
    },
  },

  render(): VNode {
    // 奖品渲染
    const optionHtmlRender = () => {
      if (this.itemRender) {
        // 自定义渲染
        return this.itemRender();
      }
      return <img src={this.image} style={this.optionStyle} alt="" />;
    };
    // 遮罩层渲染
    const maskHtmlRender = () => {
      if (this.maskImage) {
        return <img src={this.maskImage} style={this.optionStyle} alt="" />;
      }
      return <div class="mask" style={this.optionStyle}></div>;
    };
    // 当前的奖品的遮罩层是否展示
    const isShowMask =
      this.activeIndex < 32 &&
      this.activeIndex % this.cubeNum === this.originalIndex;
    return (
      <div class="mk-sudoku-option__wrap">
        <div
          class="mk-sudoku-option"
          onClick={() => this.itemClick(this.originalIndex)}
        >
          {optionHtmlRender()}
        </div>
        {isShowMask && (
          <div class="mk-sudoku-option__mask">{maskHtmlRender()}</div>
        )}
      </div>
    );
  },
});
