<template>
  <div class="tuia-doc-simulator" :class="{'tuia-doc-simulator-fixed': isTopFixed}">
    <div class="tuia-doc-demo">
      <slot></slot>
    </div>
  </div>
</template>
<script>
export default {
  name: 'Simulator',
  props: {
    isTopFixed: Boolean
  }
}
</script>
<style lang="less" scoped>
.tuia-doc-simulator {
  position: absolute;
  right: 30px;
  top: 90px;
  box-sizing: border-box;
  overflow: hidden;
  width: 360px;
  min-width: 360px;
  height: 640px;
  text-align: center;
  background-color: #fafafa;
  border-radius: 12px;
  box-shadow: #ebedf0 0 4px 12px;
}
.tuia-doc-simulator-fixed {
  position: fixed;
  top: 30px;
}
.tuia-doc-demo {
  margin-top: 32px;
}
</style>
