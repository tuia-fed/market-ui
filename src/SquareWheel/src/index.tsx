import { PropType } from 'vue';
import WheelBase, { PrizeType } from '../../Wheel/src/Wheel';
import { StyleType } from '../../../types/Core';
import StateConstant from '../../constants/StateConstant';

const GridPos = [
  [0, 0],
  [1, 0],
  [2, 0],
  [2, 1],
  [2, 2],
  [1, 2],
  [0, 2],
  [0, 1],
];

export default WheelBase.extend({
  extends: WheelBase,
  name: 'mk-square-wheel',

  props: {
    containerStyle: {
      type: Object as PropType<StyleType>,
      remark: '底盘样式（包含整体位置）',
      default() {
        return {
          width: 750,
          height: 750,
          top: 0,
          left: 0,
        };
      },
    },
    containerImg: {
      type: String,
      remark: '底盘图片',
      default:
        '//yun.tuisnake.com/market-ui/80775426-025f-44ab-8374-d3bc03e15b9b.png',
    },
    gridStyle: {
      type: Object as PropType<StyleType>,
      remark: '每个格子的样式',
      default() {
        return {
          width: 200,
          height: 200,
        };
      },
    },
    gridHorizontalSpace: {
      type: Number,
      remark: '格子横向间距',
      default: 6,
    },
    gridVerticalSpace: {
      type: Number,
      remark: '格子纵向间距',
      default: 6,
    },
    gridBottomImg: {
      type: String,
      remark: '格子底部图片',
      default:
        '//yun.tuisnake.com/market-ui/ac59e2bb-df18-47cc-bb29-f121366cefb7.png',
    },
    gridMaskImg: {
      type: String,
      remark: '格子灰色遮罩图片',
      default:
        '//yun.tuisnake.com/market-ui/a998b80c-d270-4f13-96a6-13fcb31f150c.png',
    },
    btnImg: {
      type: String,
      remark: '开始按钮图片',
      default:
        '//yun.tuisnake.com/market-ui/a6897dca-63b7-4a1b-8ab4-48c305f7b1ef.png',
    },
    btnDisableImg: {
      type: String,
      remark: '开始按钮禁用图片',
      default:
        '//yun.tuisnake.com/market-ui/6d09d7aa-c799-446b-949e-72ac5cdf97f8.png',
    },
    handStyle: {
      type: Object as PropType<StyleType>,
      remark: '手势样式',
      default() {
        return {
          width: 160,
          height: 170,
          top: 390,
          left: 400,
        };
      },
    },
    handImg: {
      type: String,
      remark: '手势图片',
      default:
        '//yun.tuisnake.com/tact/turnCircle/bcb4fc7e-18c1-46d7-bdae-2e91147196c1.png',
    },
    prizeImgStyle: {
      type: Object as PropType<StyleType>,
      remark: '奖品图片样式',
      default() {
        return {
          width: 120,
          height: 120,
          top: 15,
        };
      },
    },
    prizeTextStyle: {
      type: Object as PropType<StyleType>,
      remark: '奖品标题样式',
      default() {
        return {
          width: 180,
          height: 50,
          'line-height': 50,
          'font-size': 24,
          top: 135,
        };
      },
    },
    prizeList: {
      type: Array as PropType<PrizeType[]>,
      remark: '奖品列表（当前仅支持8个）',
      default() {
        return [
          {
            title: '谢谢参与1',
            image: `//yun.tuia.cn/tuia/jimo-web-pro/smile.png`,
          },
          {
            title: '谢谢参与2',
            image: `//yun.tuia.cn/tuia/jimo-web-pro/smile.png`,
          },
          {
            title: '谢谢参与3',
            image: `//yun.tuia.cn/tuia/jimo-web-pro/smile.png`,
          },
          {
            title: '谢谢参与4',
            image: `//yun.tuia.cn/tuia/jimo-web-pro/smile.png`,
          },
          {
            title: '谢谢参与5',
            image: `//yun.tuia.cn/tuia/jimo-web-pro/smile.png`,
          },
          {
            title: '谢谢参与6',
            image: `//yun.tuia.cn/tuia/jimo-web-pro/smile.png`,
          },
          {
            title: '谢谢参与7',
            image: `//yun.tuia.cn/tuia/jimo-web-pro/smile.png`,
          },
          {
            title: '谢谢参与8',
            image: `//yun.tuia.cn/tuia/jimo-web-pro/smile.png`,
          },
        ];
      },
    },
    idleTurningSpeed: {
      type: Number,
      remark: '闲置每秒转动度数（闲置转速）',
      default: 24,
    },
    maxTurningSpeed: {
      type: Number,
      remark: '运行每秒转动度数（最大转速）',
      default: 900,
    },
    rangePercent: {
      type: Array as PropType<number[]>,
      remark: '指针命中区域范围：0-1',
      default() {
        return [0.01, 0.02];
      },
    },
  },

  computed: {
    containerStyleData(): StyleType {
      return {
        'background-image': `url(${this.containerImg})`,
        ...this.addUnitForAll(this.containerStyle),
      };
    },
    btnStyleData(): StyleType {
      let btnImg = this.btnImg;
      if (this.state === StateConstant.DISABLE && this.btnDisableImg) {
        btnImg = this.btnDisableImg;
      }
      return {
        'background-image': `url(${btnImg})`,
        ...this.addUnitForAll({
          left: (+this.containerStyle.width - +this.gridStyle.width) / 2,
          top: (+this.containerStyle.height - +this.gridStyle.height) / 2,
        }),
        ...this.addUnitForAll(this.gridStyle),
      };
    },
    handStyleData(): StyleType {
      if (!this.isWaitStart) {
        return { display: 'none' };
      }
      return {
        'background-image': `url(${this.handImg})`,
        ...this.addUnitForAll(this.handStyle),
      };
    },
    isWaitStart(): boolean {
      return this.state === StateConstant.WAIT_START;
    },
  },

  methods: {
    eventHandle(item: PrizeType, index: number) {
      if (!this.isWaitStart && this.state !== StateConstant.DISABLE) {
        return;
      }
      this.$emit('prizeClick', { item, index });
    },
    getScopedSlot(name: string, data: any = {}) {
      const slot = this.$scopedSlots[name];
      return slot && slot(data);
    },
    renderPrizes() {
      const left =
        +this.containerStyle.width * 0.5 -
        +this.gridStyle.width * 1.5 -
        this.gridHorizontalSpace;
      const top =
        +this.containerStyle.height * 0.5 -
        +this.gridStyle.height * 1.5 -
        this.gridVerticalSpace;
      const spaceLeft = this.gridHorizontalSpace + +this.gridStyle.width;
      const spaceTop = this.gridVerticalSpace + +this.gridStyle.height;
      return this.prizeList.map((item, index) => {
        const style = {
          'background-image': `url(${this.gridBottomImg})`,
          ...this.addUnitForAll({
            left: left + GridPos[index][0] * spaceLeft,
            top: top + GridPos[index][1] * spaceTop,
          }),
          ...this.addUnitForAll(this.gridStyle),
        };
        const maskStyle: StyleType = {
          'background-image': `url(${this.gridMaskImg})`,
          ...this.addUnitForAll(this.gridStyle),
        };
        if (this.wheelActiveIndex === index) {
          maskStyle.visibility = 'hidden';
        }
        return (
          <div
            class="mk-square-wheel__item"
            style={style}
            onClick={() => this.eventHandle(item, index)}
          >
            <div
              class="mk-square-wheel__item-img"
              style={{
                'background-image': `url(${this.prizeList[index].image})`,
                ...this.addUnitForAll(this.prizeImgStyle),
              }}
            ></div>
            <div
              class="mk-square-wheel__item-text"
              style={this.addUnitForAll(this.prizeTextStyle)}
            >
              {this.prizeList[index].title}
            </div>
            <div class="mk-square-wheel__item-mask" style={maskStyle}></div>
          </div>
        );
      });
    },
  },

  mounted() {},

  render() {
    return (
      <div class="mk-square-wheel" style={this.containerStyleData}>
        {this.renderPrizes()}
        <div
          class={[
            'mk-square-wheel__btn',
            { 'mk-square-wheel__btn-active': this.isWaitStart },
          ]}
          style={this.btnStyleData}
          onClick={this.emitClickStart}
        ></div>
        {this.getScopedSlot('hand') || (
          <div class="mk-square-wheel__hand" style={this.handStyleData}></div>
        )}
      </div>
    );
  },
});
