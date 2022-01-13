import BasicBase from "../../core/BasicBase";
import UpdateMixin from "../../mixins/update";
import StateConstant from "../../constants/StateConstant";
import { animate } from "popmotion";
import { PopmotionType } from "../../../types/Core";
import { PropType } from "vue";

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
      remark: "奖品列表",
      default() {
        return [
          {
            title: "谢谢参与1",
            image: "//yun.tuia.cn/tuia/jimo-web-pro/smile.png",
          },
          {
            title: "谢谢参与2",
            image: "//yun.tuia.cn/tuia/jimo-web-pro/smile.png",
          },
          {
            title: "谢谢参与3",
            image: "//yun.tuia.cn/tuia/jimo-web-pro/smile.png",
          },
          {
            title: "谢谢参与4",
            image: "//yun.tuia.cn/tuia/jimo-web-pro/smile.png",
          },
          {
            title: "谢谢参与5",
            image: "//yun.tuia.cn/tuia/jimo-web-pro/smile.png",
          },
          {
            title: "谢谢参与6",
            image: "//yun.tuia.cn/tuia/jimo-web-pro/smile.png",
          },
        ];
      },
    },
    prizePercent: {
      type: Array as PropType<number[]>,
      remark: "奖品转盘划分比例，默认均分",
    },
    idleTurningSpeed: {
      type: Number,
      remark: "闲置每秒转动度数（闲置转速）",
      default: 24,
    },
    maxTurningSpeed: {
      type: Number,
      remark: "运行每秒转动度数（最大转速）",
      default: 900,
    },
    extraRotate: {
      type: Number,
      remark: "初始转盘上奖品相对于转盘需要额外转动的度数",
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
  computed: {
    wheelParts(): number[] {
      const len = this.prizeList.length;
      if (this.prizePercent && this.prizePercent.length) {
        if (len !== this.prizePercent.length) {
          console.error("[大转盘]转盘比例配置与奖品配置长度不一致");
        }
        const percents = this.prizePercent
          .concat(Array.from({ length: len }, () => this.prizePercent[0]))
          .slice(0, len);
        const total = percents.reduce((p, c) => p + c, 0);
        return Array.from(
          { length: len },
          (v, k) => (360 * percents[k]) / total
        );
      }
      // 默认均分
      return Array.from({ length: len }, () => 360 / len);
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
    getPrizeAngle(index: number) {
      return (
        -this.extraRotate -
        this.wheelParts.slice(0, index + 1).reduce((p, c) => p + c, 0) +
        this.wheelParts[0] / 2 +
        this.wheelParts[index] / 2
      );
    },
    async start() {
      if (this.state !== StateConstant.WAIT_START) {
        throw new Error("当前状态无法开始");
      }
      this.state = StateConstant.START;
      await this.startWheelAni(this.idleTurningSpeed, this.maxTurningSpeed);
      this.state = StateConstant.WAIT_END;
    },
    async stop(opts: WheelStopOptionType = {}) {
      if (this.state !== StateConstant.WAIT_END) {
        throw new Error("当前状态无法开始");
      }
      this.state = StateConstant.END;

      const index = (opts.index || 0) % this.prizeList.length;
      const rangePart = this.wheelParts[index] * 0.8;
      const disDegree =
        -this.getPrizeAngle(index) + (Math.random() - 0.5) * rangePart;
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
          onStop: () => reject("被停止"),
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
    setDegree(v: number) {},
  },
});
