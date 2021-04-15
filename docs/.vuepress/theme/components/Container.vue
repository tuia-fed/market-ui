<template>
  <div class="tuia-doc-container" :style="{'paddingRight': `${containerPadding}px`}">
    <div class="tuia-doc-content">
      <section>
        <slot></slot>
      </section>
    </div>
  </div>
</template>
<script>
export default {
  name: 'Container',
  props: {
    isContainerCover: Boolean
  },
  computed: {
    containerPadding() {
      return this.isContainerCover ? 0 : 390
    }
  }
}
</script>
<style lang="less" scoped>
.tuia-doc-container {
  width: 100%;
  // padding-right: 390px;
  box-sizing: border-box;
  padding-left: 220px;
  overflow: hidden;
}
.tuia-doc-content {
  position: relative;
  -webkit-box-flex: 1;
  flex: 1;
  padding: 0 0 75px;
  section {
    padding: 30px;
    overflow: hidden;
  }
}
</style>
