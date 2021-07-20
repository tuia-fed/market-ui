<template>
  <div class="page">
    <!-- #region html -->
    <div class="container">
      <div class="scratch">
        <mk-scratch-card
          class="card"
          ref="card"
          :startCallback="startCallback"
          :clearCallback="clearCallback"
        >
          <img
            class="result-img"
            src="http://yun.dui88.com/20210605/default.jpeg"
          />
        </mk-scratch-card>
      </div>

      <button class="common-button primary marginR" @click="reset">重置</button>

      <button class="common-button primary marginR" @click="stopTouch">
        停止
      </button>

      <button class="common-button primary marginR" @click="recoverTouch">
        恢复
      </button>
    </div>
    <!-- #endregion html -->
  </div>
</template>
<script>
// #region js
import { ScratchCard } from "@tuia/market-ui";

export default {
  components: {
    [ScratchCard.name]: ScratchCard,
  },

  data() {
    return {};
  },

  methods: {
    startCallback() {
      console.log("抽奖成功！");
    },
    clearCallback() {
      console.log("清除完毕！");
    },
    reset() {
      this.$refs.card.reset();
    },
    stopTouch() {
      this.$refs.card.changeStatus();
    },
    recoverTouch() {
      this.$refs.card.changeStatus(false);
    },
  },
};
// #endregion js
</script>
<style lang="less" scoped>
@import url("../../../examples/common/style/common.less");

.page {
  padding-top: 20px;
}

.container {
  position: relative;
}

.card {
  width: 100%;
  height: 230px;
  margin: auto;

  .result-img {
    width: 100%;
    height: 100%;
  }
}

.marginR {
  margin-right: 4px;
}
</style>
