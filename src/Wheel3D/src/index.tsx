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
  name: 'mk-wheel-3d',

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
    perspective: {
      type: Number,
      remark: '透视距离',
      default: 1500,
    },
    itemStyle: {
      type: Object as PropType<StyleType>,
      remark: '奖项样式',
      default() {
        return {
          width: 252,
          height: 360,
        };
      },
    },
    itemBgImg: {
      type: String,
      remark: '奖项背景图片',
      default:
        '//yun.tuisnake.com/market-ui/02b27f2f-b476-495e-b812-188981cf6261.png',
    },
    prizeImgStyle: {
      type: Object as PropType<StyleType>,
      remark: '奖品图片样式',
      default() {
        return {
          width: 180,
          height: 180,
          top: 90,
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
          top: 8,
        };
      },
    },
    prizeList: {
      type: Array as PropType<PrizeType[]>,
      remark: '奖品列表',
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
        ];
      },
    },
    wheelRadius: {
      type: Number,
      remark: '转盘半价',
      default: 250,
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
        return [0.5, 0.5];
      },
    },
  },

  computed: {
    containerStyleData(): StyleType {
      return {
        ...this.addUnitForAll(this.containerStyle),
      };
    },
    wheelStyleData(): StyleType {
      return {
        perspective: this.addUnitFunc(this.perspective),
      };
    },
    itemStyleData(): StyleType {
      return {
        ...this.addUnitForAll(this.itemStyle),
      }
    },
    textStyleData(): StyleType {
      return {
        ...this.addUnitForAll(this.prizeTextStyle),
      };
    },
    isWaitStart(): boolean {
      return this.state === StateConstant.WAIT_START;
    },
    isPrizeStatus(): boolean {
      return this.state === StateConstant.PRIZE;
    },
  },

  methods: {
    eventHandle(item: PrizeType, index: number) {
      if (!this.isWaitStart && this.state !== StateConstant.DISABLE) {
        return;
      }
      this.$emit('prizeClick', { item, index });
    },
    setDegree(v: number) {
      const rotate = this.$refs.rotate as HTMLElement;
      if (rotate && rotate.style) {
        rotate.style.transform = `translate(-50%, -50%) rotate3d(0, 1, 0, ${v}deg)`;
      }
    },
    getItemStyleData(pos: number) {
      const style: StyleType = {
        transform: `rotateY(${this.getPrizeAngle(pos)}deg) translateZ(${this.addUnitFunc(this.wheelRadius)})`,
      };
      if (this.wheelActiveIndex === pos) {
        style.filter = 'brightness(100%)';
        style.opacity = '1';
        if (this.isPrizeStatus) {
          style.transform = `rotateY(${this.getPrizeAngle(pos)}deg) translateZ(${this.addUnitFunc(this.wheelRadius * 1.5)})`;
          style.transition = 'transform 0.4s cubic-bezier(.25,.1,.3,1.5)';
        }
      }
      return {
        'background-image': this.itemBgImg ? `url(${this.itemBgImg})` : '',
        ...style,
        ...this.addUnitForAll({
          left: -this.itemStyle.width / 2,
          top: -this.itemStyle.height / 2,
          ...this.itemStyle,
        }),
      };
    },
    getPrizeImgStyleData(pos: number) {
      return {
        'background-image': `url(${this.prizeList[pos].image})`,
        ...this.addUnitForAll(this.prizeImgStyle),
      };
    },
    renderOnePrize(item: PrizeType, index: number) {
      return (
        this.getScopedSlot('prize', { item, index }) || (
          <div class="mk-wheel-3d__item" style={this.getItemStyleData(index)} onClick={() => this.eventHandle(item, index)}>
            <div class="mk-wheel-3d__item-img" style={this.getPrizeImgStyleData(index)}></div>
            <div class="mk-wheel-3d__item-text" style={this.textStyleData}>{item.title}</div>
          </div>
        )
      );
    },
  },

  render() {
    return (
      <div class="mk-wheel-3d" style={this.containerStyleData}>
        <div class="mk-wheel-3d__wheel" style={this.wheelStyleData}>
          <div ref="rotate" class="mk-wheel-3d__items">
            {this.prizeList.map((it, ind) => this.renderOnePrize(it, ind))}
          </div>
        </div>
      </div>
    );
  },
});
