import BasicBase from '../../core/BasicBase';
import UpdateMixin from '../../mixins/update';
import StateConstant from '../../constants/StateConstant';
import { animate } from 'popmotion';
import { PopmotionType } from '../../../types/Core';
import { PropType } from 'vue';

export interface WheelStopOptionType {
  index?: number;
}

export interface PrizeType {
  title?: string;
  image?: string;
}

export default BasicBase.extend({
  extends: BasicBase,
  mixins: [UpdateMixin],
  props: {
    prizeList: {
      type: Array as PropType<PrizeType[]>,
      remark: '奖品项',
      default() {
        return [
          {
            title: '谢谢参与1',
            image: '//yun.tuia.cn/tuia/jimo-web-pro/smile.png',
          },
          {
            title: '谢谢参与2',
            image: '//yun.tuia.cn/tuia/jimo-web-pro/smile.png',
          },
          {
            title: '谢谢参与3',
            image: '//yun.tuia.cn/tuia/jimo-web-pro/smile.png',
          },
          {
            title: '谢谢参与4',
            image: '//yun.tuia.cn/tuia/jimo-web-pro/smile.png',
          },
          {
            title: '谢谢参与5',
            image: '//yun.tuia.cn/tuia/jimo-web-pro/smile.png',
          },
          {
            title: '谢谢参与6',
            image: '//yun.tuia.cn/tuia/jimo-web-pro/smile.png',
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
    extraRotate: {
      type: Number,
      remark: '初始转盘上奖品相对于转盘需要额外转动的度数',
      default: 0,
    },
  },
  data() {
    return {
      wheelDegree: 0,
      wheelSpeed: 0,
      endDegree: -1,
      wheelAni: null as PopmotionType | null,
    };
  },
  watch: {
    wheelDegree(val: number) {
      this.setDegree(val);
    },
  },
  created() {
    this.waitStart();
  },
  methods: {
    update(dt: number) {
      if (this.wheelSpeed) {
        const nowDegree = this.wheelDegree + dt * this.wheelSpeed;
        if (this.endDegree > 0) {
          this.wheelDegree = Math.min(nowDegree, this.endDegree);
        } else {
          this.wheelDegree = nowDegree % 360;
        }
      }
    },
    async start() {
      if (this.state !== StateConstant.WAIT_START) {
        throw new Error('当前状态无法开始');
      }
      this.state = StateConstant.START;
      await this.startWheelAni(this.idleTurningSpeed, this.maxTurningSpeed);
      this.state = StateConstant.WAIT_END;
    },
    async stop(opts: WheelStopOptionType = {}) {
      if (this.state !== StateConstant.WAIT_END) {
        throw new Error('当前状态无法开始');
      }
      this.state = StateConstant.END;

      const index = (opts.index || 0) % this.prizeList.length;
      const part = 360 / this.prizeList.length;
      const rangePart = part * 0.8;
      const disDegree =
        this.extraRotate + part * index + (Math.random() - 0.5) * rangePart;
      const now = this.wheelDegree % 360;
      const dist = 360 * 3 - now + disDegree;
      const t = (2 * dist) / this.maxTurningSpeed;
      this.endDegree = this.wheelDegree + dist;

      // 尝试二阶段降速
      const toSpeed = this.maxTurningSpeed / 3;
      const needT1 = t / 3;
      await this.startWheelAni(this.maxTurningSpeed, toSpeed, needT1 * 1000);

      if (this.endDegree > this.wheelDegree) {
        const needT2 = (2 * (this.endDegree - this.wheelDegree)) / toSpeed;
        await this.startWheelAni(toSpeed, 0, needT2 * 1000);
      }

      this.wheelSpeed = 0;
      this.wheelDegree = disDegree;
      this.endDegree = -1;
      this.state = StateConstant.PRIZE;
    },
    async reset() {
      this.state = StateConstant.RESET;
      this.waitStart();
    },
    async disable() {
      this.stopWheelAni();
      this.state = StateConstant.DISABLE;
      this.wheelSpeed = 0;
      this.endDegree = -1;
    },
    startWheelAni(from: number, to: number, duration = 1000): Promise<void> {
      this.stopWheelAni();
      return new Promise((resolve, reject) => {
        this.wheelAni = animate({
          from,
          to,
          duration,
          onStop: () => reject('被停止'),
          onUpdate: (v) => {
            this.wheelSpeed = v;
          },
          onComplete: resolve,
        });
      });
    },
    stopWheelAni() {
      if (this.wheelAni) {
        this.wheelAni.stop();
      }
      this.wheelAni = null;
    },
    waitStart() {
      this.stopWheelAni();
      this.wheelSpeed = this.idleTurningSpeed;
      this.endDegree = -1;
      this.state = StateConstant.WAIT_START;
    },
    // eslint-disable-next-line
    setDegree(v: number) { },
  },
});
