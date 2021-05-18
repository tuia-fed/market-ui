<template>
  <div class="tuia-doc-container">
    <div class="tuia-doc-content" :style="containerStyle">
      <section>
        <slot></slot>
      </section>
    </div>
    <div class="tuia-doc-footer" :style="{'paddingRight': `${containerPaddingRight}px`}">
      <slot name="footer"></slot>
    </div>
  </div>
</template>
<script>
const NAV_HEIGHT = 60
const FOOTER_HEIGHT = 32

export default {
  name: 'Container',
  props: {
    isContainerCover: Boolean
  },
  computed: {
    containerStyle() {
      const innerHeight = window.innerHeight
      return {
        paddingRight: `${this.containerPaddingRight}px`,
        minHeight: `${innerHeight - NAV_HEIGHT - FOOTER_HEIGHT - 43}px`
      }
    },
    containerPaddingRight() {
      return this.isContainerCover ? 0 : 390
    }
  }
}
</script>
<style lang="less" scoped>
.tuia-doc-container {
  width: 100%;
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
.tuia-doc-footer {
  height: 32px;
  margin-top: -32px;
  color: #4e6e8e;
  text-align: right;
  line-height: 32px;
  font-size: 14px;
}
</style>
