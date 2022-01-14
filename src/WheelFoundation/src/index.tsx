import { PropType } from 'vue';
import BasicBase from '../../core/BasicBase';
import { WheelRef } from '../../Wheel';
import StateConstant from '../../constants/StateConstant';
import { StyleType } from 'types/Core';
import { PrizeType } from '@/Wheel/src/Wheel';

export default BasicBase.extend({
  extends: BasicBase,
  name: 'mk-wheel-foundation',
  props: {
    containerStyle: {
      type: Object as PropType<StyleType>,
      remark: '底盘样式',
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
        '//yun.tuisnake.com/market-ui/e7185b56-1757-40f7-a921-f8c818d4c1a7.png',
    },
    lightStyle: {
      type: Object as PropType<StyleType>,
      remark: '底盘灯样式',
      default() {
        return {
          width: 750,
          height: 750,
        };
      },
    },
    lightImg: {
      type: String,
      remark: '底盘灯图片',
      default:
        '//yun.tuisnake.com/market-ui/d9d80c69-fe30-42a9-9794-e61f00193593.png',
    },
    rotateStyle: {
      type: Object as PropType<StyleType>,
      remark: '转盘样式',
      default() {
        return {
          width: 635,
          height: 635,
          top: 57.5,
        };
      },
    },
    rotateImg: {
      type: String,
      remark: '转盘图片',
      default:
        '//yun.tuisnake.com/market-ui/c31f472a-5be9-4296-9b0f-353b6583bbd9.png',
    },
    pointStyle: {
      type: Object as PropType<StyleType>,
      remark: '指针样式',
      default() {
        return {
          width: 270,
          height: 270,
          top: 240,
        };
      },
    },
    pointImg: {
      type: String,
      remark: '指针图片',
      default:
        '//yun.tuisnake.com/market-ui/0b7f2b9d-c63f-46fc-a851-edc2d47df9ab.png',
    },
    btnStyle: {
      type: Object as PropType<StyleType>,
      remark: '开始按钮样式',
      default() {
        return {
          width: 175,
          height: 175,
          top: 287.5,
        };
      },
    },
    btnImg: {
      type: String,
      remark: '开始按钮图片',
      default:
        '//yun.tuisnake.com/market-ui/db4540bd-8c5a-439d-bbb6-ea3f114c4902.png',
    },
    btnDisableImg: {
      type: String,
      remark: '开始按钮禁用图片',
      default:
        '//yun.tuisnake.com/market-ui/11c22d77-2e83-405b-85e8-c8832dc78529.png',
    },
    foundationStyle: {
      type: Object as PropType<StyleType>,
      remark: '底座样式',
      default() {
        return {
          width: 750,
          height: 300,
          top: 610,
        };
      },
    },
    foundationImg: {
      type: String,
      remark: '底座图片',
      default:
        '//yun.tuisnake.com/market-ui/8a636ef9-2a48-4c47-b817-1806bfe0ba03.png',
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
          width: 140,
          height: 140,
        };
      },
    },
    prizeTextStyle: {
      type: Object as PropType<StyleType>,
      remark: '奖品标题样式',
      default() {
        return {
          width: 280,
          height: 50,
          'font-size': 24,
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
    prizePercent: {
      type: Array as PropType<number[]>,
      remark: '奖品转盘划分比例，默认均分',
    },
    extraRotate: {
      type: Number,
      remark: '初始转盘上奖品相对于转盘需要额外转动的度数',
      default: 0,
    },
    top: {
      type: Number,
      remark: '整体位置',
      default: 0,
    },
    idleTurningSpeed: {
      type: Number,
      remark: '闲置每秒转动度数（闲置转速）',
      default: 6,
    },
    maxTurningSpeed: {
      type: Number,
      remark: '运行每秒转动度数（最大转速）',
      default: 900,
    },
  },
  computed: {
    wheel(): WheelRef {
      return this.$refs.wheel as WheelRef;
    },
    containerStyle(): StyleType {
      return this.addUnitForAll({
        top: this.top,
        width: 750,
        height: 910,
      });
    },
    foundationStyleData(): StyleType {
      return {
        'background-image': `url(${this.foundationImg})`,
        ...this.addUnitForAll(this.foundationStyle),
      };
    },
  },

  methods: {
    emitStateChange(opt: any) {
      this.$emit('stateChange', opt);
    },
    emitClickStart(opt: any) {
      this.$emit('clickStart', opt);
    },
    prizeClick(opt: any) {
      this.$emit('prizeClick', opt);
    },
    getState() {
      return this.wheel.getState();
    },
    start(opts?: any) {
      return this.wheel.start(opts);
    },
    stop(opts?: any) {
      return this.wheel.stop(opts);
    },
    reset(opts?: any) {
      return this.wheel.reset(opts);
    },
    disable(opts?: any) {
      return this.wheel.disable(opts);
    },
  },

  render() {
    return (
      <div class="mk-wheel-foundation" style={this.containerStyle}>
        <mk-wheel
          ref="wheel"
          props={this.$props}
          scopedSlots={this.$scopedSlots}
          onStateChange={this.emitStateChange.bind(this)}
          onClickStart={this.emitClickStart.bind(this)}
          onPrizeClick={this.prizeClick.bind(this)}
        ></mk-wheel>
        <div
          class="mk-wheel-foundation__foundation"
          style={this.foundationStyleData}
        ></div>
      </div>
    );
  },
});
