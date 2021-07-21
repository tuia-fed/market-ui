import Vue, { PropType } from "vue";
import { RingAnimateState, CatchRingAnimateState } from "./types";
import { delay } from "../../utils";

let ringInitAnimateList: Array<RingAnimateState> = [
  {
    isShow: true, // 是否要显示
    isInitMove: true, // 是否是初始动效
    isStop: false, // 是否要停止动画
    id: "cat0",
  },
  {
    isShow: true,
    isInitMove: true,
    isStop: false,
    id: "cat1",
  },
  {
    isShow: true,
    isInitMove: true,
    isStop: false,
    id: "cat2",
  },
];
let ringCatchAnimateList: Array<CatchRingAnimateState> = [
  {
    catchActive: false,
    escapeActive: false,
  },
  {
    catchActive: false,
    escapeActive: false,
  },
  {
    catchActive: false,
    escapeActive: false,
  },
];

export default Vue.extend({
  name: "mk-ring-toss",

  props: {
    // 绘制成猫的初始化状态图片资源
    ringSource: {
      type: Array as PropType<Array<string>>,
      default: () => [],
      required: true,
    },
    // 被抓住的猫的状态图片资源
    catchRingSource: {
      type: Array as PropType<Array<string>>,
      default: () => [],
      required: true,
    },
    // 逃跑的猫的状态图片资源
    escapeRingSource: {
      type: Array as PropType<Array<string>>,
      default: () => [],
      required: true,
    },
  },

  data: () => ({
    hasCatchIndex: 0, // 哪只猫被抓、对应的索引
    ringInitAnimateList, // 猫的初始化动画
    ringCatchAnimateList, // 猫被抓的动画
  }),

  computed: {
    // 猫的初始化样式
    initRingStyleList(): string[] {
      const ringStyle = [];
      const { ringSource } = this;
      for (let j = 0; j < ringSource.length; j++) {
        const style = `backgroundImage: url(${ringSource[j]})`;
        ringStyle.push(style);
      }
      return ringStyle;
    },
    catchRingStyleList(): string[] {
      const ringStyle = [];
      const { catchRingSource } = this;
      for (let j = 0; j < catchRingSource.length; j++) {
        const style = `backgroundImage: url(${catchRingSource[j]})`;
        ringStyle.push(style);
      }
      return ringStyle;
    },
    escapeRingStyleList(): string[] {
      const ringStyle = [];
      const { escapeRingSource } = this;
      for (let j = 0; j < escapeRingSource.length; j++) {
        const style = `backgroundImage: url(${escapeRingSource[j]})`;
        ringStyle.push(style);
      }
      return ringStyle;
    },
  },

  methods: {
    /**
     * 计算抓哪只猫
     */
    calculateRing() {
      const cat0 = document.getElementById("cat0");
      const cat1 = document.getElementById("cat1");
      const windowWidth =
        document.body.clientWidth || document.documentElement.clientWidth;
      const ratio0 = (cat0?.getBoundingClientRect().left || 0) / windowWidth;
      const ratio1 = (cat1?.getBoundingClientRect().left || 0) / windowWidth;
      if (ratio0 >= 0.33 && ratio0 <= 0.7) {
        this.hasCatchIndex = 0;
      } else if (ratio1 >= 0.33 && ratio1 <= 0.7) {
        this.hasCatchIndex = 1;
      } else {
        this.hasCatchIndex = 2;
      }
    },
    /**
     * 抓猫
     */
    catchRing() {
      this.calculateRing();
      delay(100).then(() => {
        this.ringInitAnimateList[this.hasCatchIndex].isShow = false;
        this.ringInitAnimateList.forEach((item, key) => {
          if (key !== this.hasCatchIndex) {
            this.ringInitAnimateList[key].isStop = true;
          }
        });
        this.ringCatchAnimateList[this.hasCatchIndex].catchActive = true;
      });
    },
    notCatchRing() {
      this.ringCatchAnimateList[this.hasCatchIndex].catchActive = false;
      this.ringCatchAnimateList[this.hasCatchIndex].escapeActive = true;
    },
    /**
     * 重置猫的状态
     */
    resetRing() {
      this.ringInitAnimateList = [
        {
          isShow: true, // 是否要显示
          isInitMove: false, // 是否是初始动效
          isStop: false, // 是否要停止动画
          id: "cat0",
        },
        {
          isShow: true,
          isInitMove: false,
          isStop: false,
          id: "cat1",
        },
        {
          isShow: true,
          isInitMove: false,
          isStop: false,
          id: "cat2",
        },
      ];
      delay(100).then(() => {
        this.ringInitAnimateList.forEach((item) => {
          item.isInitMove = true;
        });
      });
      this.ringCatchAnimateList = [
        {
          catchActive: false,
          escapeActive: false,
        },
        {
          catchActive: false,
          escapeActive: false,
        },
        {
          catchActive: false,
          escapeActive: false,
        },
      ];
    },
    /**
     * 藏猫
     */
    hideRing() {
      this.ringInitAnimateList.forEach((item) => {
        item.isShow = false;
      });
    },
  },

  render() {
    return (
      <div class="mk-ring-toss">
        {/* 动猫 */}
        {this.ringInitAnimateList.length &&
          this.ringInitAnimateList.map((item, key) => {
            return (
              <div
                key={key}
                style={this.initRingStyleList[key]}
                id={item.id}
                class={[
                  `cat${key}`,
                  "initCat",
                  "hide",
                  { activeCatInit: item.isInitMove },
                  { stopCatMove: item.isStop },
                  { show: item.isShow },
                ]}
              ></div>
            );
          })}
        <div class="mk-ring-catch__area">
          {/* 抓猫 */}
          {this.ringCatchAnimateList.length &&
            this.ringCatchAnimateList.map((item, key) => {
              return (
                <div
                  key={`${key}0`}
                  class={[
                    "initCatchCat",
                    `catchCat${key}`,
                    { active: item.catchActive },
                  ]}
                  style={this.catchRingStyleList[key]}
                ></div>
              );
            })}
          {/* 逃猫 */}
          {this.ringCatchAnimateList.length &&
            this.ringCatchAnimateList.map((item, key) => {
              return (
                <div
                  key={`${key}1`}
                  class={[
                    "initEscapeCat",
                    `escapeCat${key}`,
                    { active: item.escapeActive },
                  ]}
                  style={this.escapeRingStyleList[key]}
                ></div>
              );
            })}
        </div>
      </div>
    );
  },
});
