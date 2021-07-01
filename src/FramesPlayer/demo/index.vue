<template>
  <demo-section>
    <demo-block card title="基础用法">
      <!-- #region html -->
      <button class="common-button primary" @click="playFrames">
        <span>播放帧动画</span>
      </button>
      <div class="frames-container">
        <mk-frames-player
          v-bind="framesPlayerConfig"
          ref="framesPlayer"
          @playEnd="onPlayEnd"
        ></mk-frames-player>
      </div>
      <!-- #endregion html -->
    </demo-block>
  </demo-section>
</template>
<script>
// #region js
export default {
  data() {
    return {
      framesPlayerConfig: {
        url:
          "https://yun.tuisnake.com/h5-mani/turncard_fivelucky/63ecacef-5e01-4922-afb4-059ad2bac143.png",
        rows: 2,
        columns: 13,
        amount: 19,
        duration: 1580,
      },
    };
  },
  methods: {
    playFrames() {
      this.$refs.framesPlayer.play();
    },
    onPlayEnd() {
      this.$mkToast.show("帧动画播放结束啦～");
    },
  },
};
// #endregion js
</script>
<style lang="less" scoped>
@import url("../../../examples/common/style/common.less");

.frames-container {
  margin-left: -12px;
}
</style>
