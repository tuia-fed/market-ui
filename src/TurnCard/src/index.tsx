import Vue, { PropType } from "vue";
import { CardImg, CardSize } from "./types";
import { getParentRect } from "../../utils";

export default Vue.extend({
  name: "mk-turn-card",

  data: () => ({
    // 组件父容器的尺寸
    container: {
      width: 0,
      height: 0,
    },
  }),

  props: {
    // 传入的卡牌配置数组,包含卡牌正面和反面背景图
    cards: {
      type: Array as PropType<Array<CardImg>>,
      default: () => [],
      required: true,
    },
    // 卡牌的翻转状态
    cardstate: {
      type: Array as PropType<Array<number>>,
      default: () => [],
      validator: function (val) {
        // 状态校验-卡牌的状态参数必须为1、2、3三种类型其中一种
        // 1-初始化状态、2-翻转过渡态、3-翻转后的状态
        return val.every((item) => [1, 2, 3].indexOf(item) !== -1);
      },
    },
    // 行卡牌数目
    rowsAmount: {
      type: Number,
      default: 3,
    },
    // 是否需要初始化的洗牌动画，默认开启
    isShuffle: {
      type: Boolean,
      default: true,
    },
  },

  methods: {
    /** 计算卡牌的背景 */
    configbackground(state: number, card: CardImg): string {
      return state > 2 ? `url(${card.back})` : `url(${card.front})`;
    },
    /** 卡牌点击事件 */
    cardNativeClick(index: number) {
      if (this.cardstate[index] > 1) return false;
      this.$emit("cardStart", index);
    },
    /** 计算卡牌的尺寸 */
    calcardsize(size: CardSize) {
      const cardW = Math.floor(size.width / this.rowsAmount); // 卡牌宽
      const result = this.cards.length / this.rowsAmount;
      const columns = Number.isInteger(result) ? result : Math.round(result); // 牌堆的列数
      const cardH = Math.floor(size.height / columns); // 卡牌高
      const cardArr = Array.from({ length: this.cards.length });
      for (let i = 0; i < cardArr.length; i++) {
        const cardDom = document.getElementById(`card${i}`) as HTMLDivElement;
        cardDom.style.width = `${cardW}px`;
        cardDom.style.height = `${cardH}px`;
      }
    },
    /** 初始化洗牌动画 */
    shuffleCard(duration: number, middleIndex?: number) {
      const cardArr = Array.from({ length: this.cards.length });
      const cardDomArr: Array<HTMLDivElement> = [];
      for (let i = 0; i < cardArr.length; i++) {
        const cardDom = document.getElementById(`card${i}`) as HTMLDivElement;
        cardDomArr.push(cardDom);
      }
      const middle = middleIndex || (cardArr.length / 2) | 0;
      const middleRect = cardDomArr[middle].getBoundingClientRect();
      // 遍历传入的dom
      for (let j = 0; j < cardDomArr.length; j++) {
        const item = cardDomArr[j].getBoundingClientRect();
        cardDomArr[j].style.transitionDuration = "0ms";
        cardDomArr[j].style.transform = `translate(${
          middleRect.x - item.x
        }px, ${middleRect.y - item.y}px)`;
      }
      // 下一帧再回到卡牌的初始位置
      setTimeout(() => {
        for (let j = 0; j < cardDomArr.length; j++) {
          cardDomArr[j].style.transitionDuration = `${duration}ms`;
          cardDomArr[j].style.transform = "translate(0, 0)";
        }
      });
    },
  },

  mounted() {
    this.$nextTick(() => {
      getParentRect({ id: "mkTurncard" })
        .then((res) => {
          const { width, height } = res;
          this.container.width = width;
          this.container.height = height;
          this.calcardsize(this.container);
          // 开启洗牌动画
          if (this.isShuffle) this.shuffleCard(500);
        })
        .catch((err) => {
          console.error("请给组件添加一个父容器!");
        });
    });
  },

  render() {
    return (
      <div class="mk-turncard-main" id="mkTurncard">
        {this.cards.length &&
          this.cards.map((card, index) => {
            return (
              <div class="mk-turncard-card__box" key={index}>
                <div
                  id={`card${index}`}
                  class={[
                    "mk-turncard-card__item",
                    {
                      "mk-turncard-card__item-turn": this.cardstate[index] > 1,
                    },
                    {
                      "mk-turncard-card__item-turn2": this.cardstate[index] > 2,
                    },
                  ]}
                  style={{
                    backgroundImage: this.configbackground(
                      this.cardstate[index],
                      card
                    ),
                  }}
                  onClick={() => this.cardNativeClick(index)}
                ></div>
                {this.$slots.default}
              </div>
            );
          })}
      </div>
    );
  },
});
