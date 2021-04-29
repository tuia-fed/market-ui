<template>
  <section class="doc-demo-section">
    <slot />
  </section>
</template>
<script>
export default {
  name: 'DemoSection'
}
</script>
<style lang="less" scoped>
.doc-demo-section {
  box-sizing: border-box;
  min-height: calc(100vh - 56px);
  padding-bottom: 20px;
}
</style>