<template>
  <demo-section>
    <!-- #region html -->
    <div class="turncard_wrap">
      <mk-turn-card
        :cards="cards"
        :cardstate="cardState"
        @cardStart="handleCardStart"
      >
      </mk-turn-card>
    </div>
    <!-- #endregion html -->
  </demo-section>
</template>
<script>
// #region js
export default {
  data() {
    return {
      cardImg: {
        front:
          "https://yun.tuisnake.com/h5-mani/turncard_fivelucky/9722f608-dfb4-4b52-bfb3-880406c637a0.png",
        back:
          "https://yun.tuisnake.com/h5-mani/turncard_fivelucky/f25455fe-ce70-431f-8086-c5fe2d7e4dfc.png",
      },
      cardState: [],
    };
  },

  computed: {
    cards() {
      return new Array(9).fill(this.cardImg);
    },
  },

  methods: {
    handleCardStart(index) {
      // 校验抽奖次数
      if (index === 8) {
        this.$mkToast.show("抽奖次数已用完");
        return;
      }
      this.$mkToast.show(`您抽中的卡牌是第${index + 1}张`);
      // 翻转对应索引卡牌
      this.$set(this.cardState, index, 2);
      this.sleep(300).then(() => {
        this.$set(this.cardState, index, 3);
      });
    },
    sleep(time) {
      return new Promise((resolve) => setTimeout(resolve, time));
    },
  },

  mounted() {
    this.cardState = new Array(9).fill(1);
  },
};
// #endregion js
</script>
<style lang="less" scoped>
.turncard_wrap {
  box-sizing: border-box;
  height: 350px;
  margin: 20px 10px;
}
</style>
