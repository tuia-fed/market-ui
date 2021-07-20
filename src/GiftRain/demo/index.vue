<template>
  <div class="page_wrap">
    <!-- #region html -->
    <div class="gift_rain_wrap">
      <mk-gift-rain
        :imgSource="sourceImgs"
        :giftOpenFrame="giftFrame"
        @openGift="handleOpenGift"
        ref="giftRain"
      ></mk-gift-rain>
    </div>
    <button class="common-button primary positionfix" @click="handleStartRain">
      <span>开始红包雨</span>
    </button>
    <button class="common-button primary stopfix" @click="handleStopRain">
      <span>停止红包雨</span>
    </button>
    <!-- #endregion html -->
  </div>
</template>
<script>
// #region js
export default {
  data() {
    return {
      sourceImgs: [
        "//yun.tuisnake.com/h5-mami/dist/normal1.cca5bdfdc574870aaea6510b3b271323.png",
        "//yun.tuisnake.com/h5-mami/dist/update-first-1.6fbfca78758ec31dc6d906e7c10aec0c.png",
        "//yun.tuisnake.com/h5-mami/dist/update-second-1.e5fbfc30fa509bad85dfb496f22beb4f.png",
      ],
      giftFrame: {
        url:
          "//yun.tuisnake.com/h5-mami/dist/redpacket-split-light.d2d071e706c7616dc659cebaaf2ce796.png",
        amount: 6,
      },
      isStopState: true, // 是否先关闭
    };
  },
  methods: {
    handleStartRain() {
      if (this.isStopState) {
        this.$refs["giftRain"].start();
        this.isStopState = false;
      } else {
        this.$mkToast.show("请先停止红包🌧️ ~");
      }
    },

    handleStopRain() {
      this.isStopState = true;
      this.$refs["giftRain"].stop();
    },

    handleOpenGift(amount) {
      this.$mkToast.show(`恭喜您已经拆开${amount}个红包`);
    },
  },
};
// #endregion js
</script>
<style lang="less" scoped>
@import url("../../../examples/common/style/common.less");

.page_wrap {
  position: relative;
  width: 100%;
}

.gift_rain_wrap {
  width: 100%;
  height: 584px;
}

.positionfix {
  position: fixed;
  right: 12px;
  bottom: 12px;
}

.stopfix {
  position: fixed;
  right: 152px;
  bottom: 12px;
}
</style>
