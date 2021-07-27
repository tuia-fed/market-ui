<template>
  <demo-section>
    <demo-block card title="基础用法1">
      <!-- #region html1 -->
      <button class="common-button primary" @click="open">
        <span>Toast提示</span>
      </button>
      <!-- #endregion html1 -->
    </demo-block>
    <demo-block card title="基础用法2">
      <!-- #region html2 -->
      <button class="common-button primary" @click="openToast">
        <span>Toast提示</span>
      </button>
      <!-- #endregion html2 -->
    </demo-block>
  </demo-section>
</template>
<script>
// #region js
export default {
  methods: {
    open() {
      this.$mkToast.show("这是一个toast提示");
    },
    openToast() {
      this.$mkToast.show({
        msg: "这是一个顶部的toast提示",
        position: "top",
        duration: 2500,
      });
    },
  },
};
// #endregion js
</script>
<style lang="less" scoped>
@import url("../../../examples/common/style/common.less");
</style>
