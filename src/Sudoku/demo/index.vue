<template>
  <demo-section>
    <demo-block>
      <!-- #region html -->
      <mk-sudoku></mk-sudoku>
      <!-- #endregion html -->
    </demo-block>
  </demo-section>
</template>
<script>
// #region js
export default {
  data() {
    return {
      angle: 0,
    };
  },
};
// #endregion js
</script>
<style lang="less" scoped>
.primary {
  color: #fff;
  background-color: #409eff;
  border-color: #409eff;
  margin-top: 12px;
}
</style>
