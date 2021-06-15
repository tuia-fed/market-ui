<template>
  <demo-section>
    <demo-block card title="基础用法1">
      <!-- #region html1 -->
      <button class="toast-button primary" @click="open">
        <span>Toast提示</span>
      </button>
      <!-- #endregion html1 -->
    </demo-block>
    <demo-block card title="基础用法2">
      <!-- #region html2 -->
      <button class="toast-button primary" @click="openToast">
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
.toast-button {
  display: inline-block;
  line-height: 1;
  white-space: nowrap;
  cursor: pointer;
  background: #fff;
  border: 1px solid #dcdfe6;
  color: #606266;
  -webkit-appearance: none;
  text-align: center;
  box-sizing: border-box;
  outline: none;
  margin: 0;
  transition: 0.1s;
  font-weight: 500;
  -moz-user-select: none;
  -webkit-user-select: none;
  -ms-user-select: none;
  padding: 12px 20px;
  font-size: 14px;
  border-radius: 4px;
}

.primary {
  color: #fff;
  background-color: #409eff;
  border-color: #409eff;
  margin-top: 12px;
}
</style>
