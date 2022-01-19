import { PropType } from 'vue';
import BasicBasePlus from '../../core/BasicBasePlus';
import ScratchCanvas from './ScratchCanvas';
import StateConstant from '../../constants/StateConstant';
import { SizeType, StyleType } from '../../../types/Core';

export default BasicBasePlus.extend({
  extends: BasicBasePlus,
  name: 'mk-scratch-card',

  data() {
    return {
      canvas: null as never as ScratchCanvas,
    };
  },

  props: {
    containerStyle: {
      type: Object as PropType<StyleType>,
      remark: '容器样式（包含整体位置）',
      default() {
        return {
          width: 750,
          height: 465,
        };
      },
    },
    containerImg: {
      type: String,
      remark: '容器背景图片',
      default: '//yun.tuisnake.com/market-ui/c6c0a01c-59e1-4317-bfa2-b46c361e9a3a.png',
    },
    scratchStyle: {
      type: Object as PropType<StyleType>,
      remark: '刮刮卡样式',
      default() {
        return {
          left: 15,
          top: 30,
        };
      },
    },
    scratchSize: {
      type: Object as PropType<SizeType>,
      remark: '可刮区域宽高',
      default() {
        return {
          width: 720,
          height: 405,
        };
      },
    },
    coverImg: {
      type: String,
      remark: '刮刮卡封面图片',
      default: '//yun.tuisnake.com/market-ui/71d1c715-17d2-426a-867f-da00c4647213.png',
    },
    coverDisableImg: {
      type: String,
      remark: '刮刮卡禁用时封面图片',
      default: '//yun.tuisnake.com/market-ui/71d1c715-17d2-426a-867f-da00c4647213.png',
    },
    coverColor: {
      type: String,
      remark: '刮刮卡封面兜底颜色',
      default: '#c5c5c5',
    },
    brushSize: {
      type: Object as PropType<SizeType>,
      remark: '刮刮卡刷子宽高',
      default() {
        return {
          width: 160,
          height: 100,
        };
      },
    },
    brushImg: {
      type: String,
      remark: '刮刮卡刷子图片',
      default: '//yun.tuisnake.com/market-ui/7fde6794-f9b4-49a1-8f08-44673bacbb23.png',
    },
    brushRadius: {
      type: Number,
      remark: '刮的刷子兜底圆圈半径',
      default: 40,
    },
    prizeImg: {
      type: String,
      remark: '奖品图片',
      default: '//yun.tuisnake.com/market-ui/b16b8439-b6ee-4aa4-8c2a-c158c1ea613c.png',
    },
    coreRect: {
      type: Array as PropType<number[]>,
      remark: '奖品核心区域范围，用于判断刮的程度，数字数组（0-1）：[left, top, width, height]',
      default() {
        return [0.1, 0.1, 0.8, 0.8];
      },
    },
    endRatio: {
      type: Number,
      remark: '当核心区域手动刮掉的面积达到这个值时，表示刮完了',
      default: 0.5,
    },
    enableAutoScratch: {
      type: Boolean,
      remark: '当手动刮一次未达到结束标准时，是否触发自动刮开',
      default: true,
    },
    autoScratchPath: {
      type: Array as PropType<number[][]>,
      remark: '自动刮开路径，二维坐标数组（0-1）最后一项表示该路径耗时：[[x1, y1], [x2, y2, t2]]',
      default() {
        return [[0.9, 0.1], [0.1, 0.27, 250], [0.96, 0.36, 250], [0.07, 0.62, 250], [0.96, 0.6, 250], [0.05, 0.85, 250]];
      },
    },
    tipsStyle: {
      type: Object as PropType<StyleType>,
      remark: '提示文字（跳动文字）整体样式',
      default() {
        return {
          'font-size': 100,
        };
      },
    },
    tipsWords: {
      type: String,
      remark: '提示文字（跳动文字）',
      default: '领福利啦～',
    },
    handStyle: {
      type: Object as PropType<StyleType>,
      remark: '手势样式',
      default() {
        return {
          width: 160,
          height: 170,
        };
      },
    },
    handImg: {
      type: String,
      remark: '手势图片',
      default:
        '//yun.tuisnake.com/tact/turnCircle/bcb4fc7e-18c1-46d7-bdae-2e91147196c1.png',
    },
  },

  computed: {
    containerStyleData(): StyleType {
      return {
        'background-image': this.containerImg ? `url(${this.containerImg})` : '',
        ...this.addUnitForAll(this.containerStyle),
      };
    },
    contentStyleData(): StyleType {
      return {
        ...this.addUnitForAll(this.scratchSize),
        ...this.addUnitForAll(this.scratchStyle),
      };
    },
    prizeStyleData(): StyleType {
      return {
        'background-image': this.prizeImg ? `url(${this.prizeImg})` : '',
      };
    },
    disableCoverStyleData(): StyleType {
      if (this.coverDisableImg) {
        return {
          'background-image': `url(${this.coverDisableImg})`,
        };
      }
      return {
        'background-cover': this.coverColor,
      };
    },
    tipsStyleData(): StyleType {
      return this.addUnitForAll(this.tipsStyle);
    },
    handStyleData(): StyleType {
      return {
        'background-image': this.handImg ? `url(${this.handImg})` : '',
        ...this.addUnitForAll(this.handStyle),
      };
    },
    isDisable(): boolean {
      return this.state === StateConstant.DISABLE;
    },
    isShowPrize(): boolean {
      return this.state >= StateConstant.START && this.state <= StateConstant.PRIZE;
    },
    isCanvasShow(): boolean {
      return !this.isDisable && this.state !== StateConstant.PRIZE;
    },
    isWaitStart(): boolean {
      return this.state === StateConstant.WAIT_START;
    },
  },

  mounted() {
    this.canvas = new ScratchCanvas({
      canvas: this.$refs.canvas as HTMLCanvasElement,
      coverColor: this.coverColor,
      coverImg: this.coverImg,
      brushSize: this.brushSize,
      brushImg: this.brushImg,
      brushRadius: this.brushRadius,
      scratchStart: this.scratchStart.bind(this),
      scratchEnd: this.scratchEnd.bind(this),
    });
    this.init();
  },

  methods: {
    async init() {
      await this.canvas.init();
      this.state = StateConstant.WAIT_START;
    },
    scratchStart(e: Event) {
      if (this.state === StateConstant.WAIT_START) {
        this.state = StateConstant.START;
        this.emitClickStart(e);
      }
    },
    scratchEnd() {
      const per = this.canvas.getEmptyPercent(this.coreRect);
      if (per >= this.endRatio) {
        this.state = StateConstant.END;
        this.state = StateConstant.PRIZE;
      } else if (this.enableAutoScratch) {
        this.autoScratch();
      }
    },
    async start() {
      if (this.state !== StateConstant.WAIT_START) {
        throw new Error('当前状态无法开始');
      }
      this.state = StateConstant.START;
      await this.autoScratch();
    },
    async reset() {
      this.state = StateConstant.RESET;
      this.canvas.reset();
      this.canvas.setUserScratchEnable(true);
      this.state = StateConstant.WAIT_START;
    },
    async disable() {
      this.canvas.reset();
      this.canvas.setUserScratchEnable(false);
      this.state = StateConstant.DISABLE;
    },
    async autoScratch() {
      this.canvas.setUserScratchEnable(false);
      this.state = StateConstant.END;
      await this.canvas.scratchWithPath(this.autoScratchPath);
      this.state = StateConstant.PRIZE;
    },
    renderTips() {
      return this.getScopedSlot('tips') || (this.isWaitStart && this.tipsWords.length &&
        <div class="mk-scratch-card__tips" style={this.tipsStyleData}>
          {this.tipsWords.split('').map((it, ind) => (
            <span style={{ animationDelay: 0.2 * ind + 's'}}>{it}</span>
          ))}
        </div>
      );
    },
  },

  render() {
    return (
      <div class="mk-scratch-card" style={this.containerStyleData}>
        <div class="mk-scratch-card__content" style={this.contentStyleData}>
          <div class="mk-scratch-card__result" v-show={this.isShowPrize}>{this.getScopedSlot('result') || <div class="mk-scratch-card__result-prize" style={this.prizeStyleData}></div>}</div>
          <canvas ref="canvas" width={this.scratchSize.width} height={this.scratchSize.height} class="mk-scratch-card__canvas" v-show={this.isCanvasShow}></canvas>
          <div class="mk-scratch-card__disable-cover" v-show={this.isDisable} style={this.disableCoverStyleData}></div>
          {this.renderTips()}
          {this.isWaitStart ? <div class="mk-scratch-card__hand" style={this.handStyleData}></div> : null}
        </div>
      </div>
    );
  },
});
