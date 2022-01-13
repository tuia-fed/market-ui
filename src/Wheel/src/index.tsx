import { PropType } from 'vue';
import WheelBase, { PrizeType } from './Wheel';
import StateConstant from '../../constants/StateConstant';
import { StyleType } from '../../../types/Core';

const LIGHT_TIME: Record<string, string> = {
  [StateConstant.DISABLE]: '0s',
  [StateConstant.PRIZE]: '0.5s',
  [StateConstant.WAIT_START]: '1s',
};

export default WheelBase.extend({
  extends: WheelBase,
  name: 'mk-wheel',
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
  },
  computed: {
    containerStyleData(): StyleType {
      return {
        'background-image': `url(${this.containerImg})`,
        ...this.addUnitForAll(this.containerStyle),
      };
    },
    lightStyleData(): StyleType {
      return {
        'background-image': `url(${this.lightImg})`,
        left: this.addUnitFunc(
          (+this.containerStyle.width - +this.lightStyle.width) / 2
        ),
        ...this.addUnitForAll(this.lightStyle),
      };
    },
    lightBlinkStyleData(): StyleType {
      return {
        'animation-duration': LIGHT_TIME[this.state] || '0.7s',
      };
    },
    rotatedomStyleData(): StyleType {
      return {
        'background-image': `url(${this.rotateImg})`,
        'transform-origin': 'center center',
        left: this.addUnitFunc(
          (+this.containerStyle.width - +this.rotateStyle.width) / 2
        ),
        ...this.addUnitForAll(this.rotateStyle),
      };
    },
    pointStyleData(): StyleType {
      return {
        'background-image': `url(${this.pointImg})`,
        left: this.addUnitFunc(
          (+this.containerStyle.width - +this.pointStyle.width) / 2
        ),
        ...this.addUnitForAll(this.pointStyle),
      };
    },
    btnStyleData(): StyleType {
      let btnImg = this.btnImg;
      if (this.state === StateConstant.DISABLE && this.btnDisableImg) {
        btnImg = this.btnDisableImg;
      }
      return {
        'background-image': `url(${btnImg})`,
        left: this.addUnitFunc(
          (+this.containerStyle.width - +this.btnStyle.width) / 2
        ),
        ...this.addUnitForAll(this.btnStyle),
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
    isWaitStart() {
      return this.state === StateConstant.WAIT_START;
    },
    textStyleData(): StyleType {
      return {
        top: this.addUnitFunc(-this.rotateStyle.width * 0.44),
        ...this.addUnitForAll(this.prizeTextStyle),
      };
    },
  },
  methods: {
    eventHandle(item: PrizeType, index: number) {
      if (!this.isWaitStart && this.state !== StateConstant.DISABLE) {
        return;
      }
      this.$emit('prizeClick', { item, index });
    },
    getPrizeStyleData(pos: number) {
      const { width, height } = this.rotateStyle;
      return {
        transform: `rotate(${this.getPrizeAngle(pos)}deg)`,
        ...this.addUnitForAll({
          left: +width / 2,
          top: +height / 2,
        }),
      };
    },
    getPrizeImgStyleData(pos: number) {
      const imgSize =
        this.wheelParts[pos] > 45
          ? {
              top: this.addUnitFunc(-this.rotateStyle.width * 0.38),
            }
          : {
              top: this.addUnitFunc(-this.rotateStyle.width * 0.48),
              transform: 'translate(-50%) scale(0.7)',
            };
      return {
        ...imgSize,
        'background-image': `url(${this.prizeList[pos].image})`,
        ...this.addUnitForAll(this.prizeImgStyle),
      };
    },
    setDegree(v: number) {
      const rotate = this.$refs.rotate as HTMLElement;
      if (rotate && rotate.style) {
        rotate.style.transform = `rotate3d(0, 0, 1, ${v}deg)`;
      }
    },
    getScopedSlot(name: string, data: any = {}) {
      const slot = this.$scopedSlots[name];
      return slot && slot(data);
    },
    renderOnePrize(item: PrizeType, index: number) {
      return (
        this.getScopedSlot('prize', { item, index }) || [
          <div
            class="mk-wheel__item-img"
            style={this.getPrizeImgStyleData(index)}
            onClick={() => this.eventHandle(item, index)}
          ></div>,
          this.wheelParts[index] > 45 ? (
            <div class="mk-wheel__item-text" style={this.textStyleData}>
              {item.title}
            </div>
          ) : null,
        ]
      );
    },
    renderPrizes() {
      return this.prizeList.map((item, index) => {
        return (
          <div
            class="mk-wheel__item"
            index={index}
            style={this.getPrizeStyleData(index)}
          >
            {this.renderOnePrize(item, index)}
          </div>
        );
      });
    },
  },
  render() {
    return (
      <div class="mk-wheel" style={this.containerStyleData}>
        {this.getScopedSlot('light') || (
          <div class="mk-wheel__light" style={this.lightStyleData}>
            <div
              class="mk-wheel__light-blink"
              style={this.lightBlinkStyleData}
            ></div>
          </div>
        )}
        <div
          ref="rotate"
          class="mk-wheel__rotate"
          style={this.rotatedomStyleData}
        >
          {this.renderPrizes()}
        </div>
        <div class="mk-wheel__point" style={this.pointStyleData}></div>
        <div
          class={[
            'mk-wheel__btn',
            { 'mk-wheel__btn-active': this.isWaitStart },
          ]}
          style={this.btnStyleData}
          onClick={this.emitClickStart}
        ></div>
        {this.getScopedSlot('hand') || (
          <div class="mk-wheel__hand" style={this.handStyleData}></div>
        )}
      </div>
    );
  },
});
