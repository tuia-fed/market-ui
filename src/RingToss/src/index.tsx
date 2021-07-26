import Vue, { PropType } from "vue";
import { RingAnimateState, CatchRingAnimateState } from "./types";
import { delay } from "../../utils";

let ringInitAnimateList: Array<RingAnimateState> = [];
let ringCopyInitAnimateList: Array<RingAnimateState> = [];
let ringCatchAnimateList: Array<CatchRingAnimateState> = [];
let ringCopyCatchAnimateList: Array<CatchRingAnimateState> = [];

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
    ringCopyInitAnimateList,
    ringCatchAnimateList, // 猫被抓的动画
    ringCopyCatchAnimateList
  }),

  created() {
    const ringList = this.calculateInitRingAnimate()
    this.ringInitAnimateList = [...ringList]
    this.ringCopyInitAnimateList = JSON.parse(JSON.stringify(ringList))

    const ringCatchList = this.calculateCatchRingAnimate()
    this.ringCatchAnimateList = [...ringCatchList]
    this.ringCopyCatchAnimateList = JSON.parse(JSON.stringify(ringCatchList))
  },

  methods: {
    /**
     * 计算猫的初始化动画状态
     */
    calculateInitRingAnimate() {
      const basicAnimateState: Omit<RingAnimateState, 'id'> = {
        isShow: true, // 是否要显示
        isInitMove: true, // 是否是初始动效
        isStop: false, // 是否要停止动画
      }
      const animateList: Array<RingAnimateState> = []
      for (let i = 0; i < this.ringSource.length; i++) {
        const mergeProps = {
          ...basicAnimateState,
          id: `cat${i}`
        }
        animateList.push(mergeProps)
      }
      return animateList
    },
    /**
     * 计算抓猫的动画状态
     */
    calculateCatchRingAnimate() {
      const animateState: CatchRingAnimateState = {
        catchActive: false,
        escapeActive: false
      }
      const animateArr = new Array(this.catchRingSource.length).fill(animateState)
      return animateArr
    },
    // 猫的初始化样式
    initRingStyleList(ringSources: string[]): string[] {
      const ringStyle = [];
      for (let j = 0; j < ringSources.length; j++) {
        const style = `backgroundImage: url(${ringSources[j]})`;
        ringStyle.push(style);
      }
      return ringStyle;
    },
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
      const basicList = JSON.parse(JSON.stringify(this.ringCopyInitAnimateList))
      this.ringInitAnimateList = basicList.map((item: RingAnimateState) => {
        const newItem = Object.assign(item, { isInitMove: false })
        return newItem
      })
      delay(100).then(() => {
        this.ringInitAnimateList.forEach((item) => {
          item.isInitMove = true;
        });
      });

      const basicCatchList = JSON.parse(JSON.stringify(this.ringCopyCatchAnimateList))
      this.ringCatchAnimateList = [...basicCatchList];
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
                style={this.initRingStyleList(this.ringSource)[key]}
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
                  key={`${key}_0`}
                  class={[
                    "initCatchCat",
                    `catchCat${key}`,
                    { active: item.catchActive },
                  ]}
                  style={this.initRingStyleList(this.catchRingSource)[key]}
                ></div>
              );
            })}
          {/* 逃猫 */}
          {this.ringCatchAnimateList.length &&
            this.ringCatchAnimateList.map((item, key) => {
              return (
                <div
                  key={`${key}_1`}
                  class={[
                    "initEscapeCat",
                    `escapeCat${key}`,
                    { active: item.escapeActive },
                  ]}
                  style={this.initRingStyleList(this.escapeRingSource)[key]}
                ></div>
              );
            })}
        </div>
      </div>
    );
  },
});
