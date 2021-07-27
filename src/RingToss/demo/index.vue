<template>
  <demo-section>
    <!-- #region html -->
    <div class="page_ring_toss">
      <mk-ring-toss
        :ringSource="ringSource"
        :catchRingSource="catchRingSource"
        :escapeRingSource="escapeRingSource"
        ref="ringToss"
      ></mk-ring-toss>
      <!-- 操控区 -->
      <button
        class="common-button primary catchfix"
        @click="handleCatchCatSuccess"
      >
        <span>抓猫成功</span>
      </button>
      <button class="common-button primary failfix" @click="handleCatchCatFail">
        <span>抓猫失败</span>
      </button>
    </div>
    <!-- #endregion html -->
  </demo-section>
</template>
<script>
// #region js
export default {
  data() {
    return {
      ringSource: [
        "//yun.tuisnake.com/h5-mami/dist/cat0.9f9f61100740fbdf796807c6a84705ae.png",
        "//yun.tuisnake.com/h5-mami/dist/cat1.118f8f1fc52bbcbc81b5ffa711295a7a.png",
        "//yun.tuisnake.com/h5-mami/dist/cat2.bc2c5c5927309dd27bf9da72cb69a19a.png",
      ],
      catchRingSource: [
        "//yun.tuisnake.com/h5-mami/dist/catchCat0.e1151c3c4fb0324e1929aa00e5a3da82.png",
        "//yun.tuisnake.com/h5-mami/dist/catchCat1.95b812fc9131ca992defd61547256178.png",
        "//yun.tuisnake.com/h5-mami/dist/catchCat2.7967b3aff402dc1bbd06c1dcfed46d8a.png",
      ],
      escapeRingSource: [
        "//yun.tuisnake.com/h5-mami/dist/escapeCat0.ae13de3594ab5532ed91232dd97c402d.png",
        "//yun.tuisnake.com/h5-mami/dist/escapeCat1.aa028f31b491e5ed56c198a35d4ebaa3.png",
        "//yun.tuisnake.com/h5-mami/dist/escapeCat2.c29b54d55c5488f62d87d5de8a48ae21.png",
      ],
    };
  },

  methods: {
    // 成功抓猫
    handleCatchCatSuccess() {
      // 抓猫
      this.$refs["ringToss"].catchRing();
      // 藏猫
      this.delay(2000).then(() => {
        this.$refs["ringToss"].hideRing();
      });
      this.delay(2800).then(() => {
        this.handleResetCat();
      });
    },

    // 抓猫失败
    handleCatchCatFail() {
      // 抓猫
      this.$refs["ringToss"].catchRing();
      // 失败
      this.delay(2300).then(() => {
        this.$refs["ringToss"].notCatchRing();
      });
      this.delay(3000).then(() => {
        this.handleResetCat();
      });
    },

    // 重置抓猫
    handleResetCat() {
      this.$refs["ringToss"].resetRing();
    },

    delay(time) {
      return new Promise((resolve) => {
        setTimeout(resolve, time);
      });
    },
  },
};
// #endregion js
</script>
<style lang="less" scoped>
@import url("../../../examples/common/style/common.less");

.page_ring_toss {
  position: relative;
  width: 100%;
  height: 584px;
}

.catchfix {
  position: absolute;
  bottom: 100px;
  left: 50px;
}

.failfix {
  position: absolute;
  right: 50px;
  bottom: 100px;
}
</style>
