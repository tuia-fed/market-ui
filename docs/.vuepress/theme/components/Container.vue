<template>
  <div class="tuia-doc-container">
    <div class="tuia-doc-content" :style="containerStyle">
      <!-- 文档内容区 -->
      <section>
        <slot></slot>
      </section>
      <!-- 模拟器区 -->
      <div class="tuia-doc-preview">
        <slot name="simulator"></slot>
      </div>
    </div>
    <div class="tuia-doc-footer">
      <slot name="footer"></slot>
    </div>
  </div>
</template>
<script>
const NAV_HEIGHT = 60
const FOOTER_HEIGHT = 32

export default {
  name: 'Container',
  data: () => ({
    windowHeight: 0
  }),
  computed: {
    containerStyle() {
      return {
        minHeight: `${this.windowHeight - NAV_HEIGHT - FOOTER_HEIGHT - 43}px`
      }
    }
  },
  mounted() {
    this.windowHeight = window.innerHeight
  }
}
</script>
<style lang="less" scoped>
.tuia-doc-container {
  box-sizing: border-box;
  width: 100%;
  padding: 0 122px 0 342px;
  overflow: hidden;
}

.tuia-doc-content {
  position: relative;
  -webkit-box-flex: 1;
  flex: 1;
  padding: 0 0 75px;

  section {
    padding: 30px;
    padding-right: 0;
    overflow: hidden;
  }

  .tuia-doc-preview {
    position: absolute;
    top: 58px;
    right: 0;
    box-sizing: border-box;
    width: 360px;
    min-width: 360px;
    height: 640px;
    overflow: hidden;
    background-color: #fafafa;
    border-radius: 12px;
    box-shadow: #ebedf0 0 4px 12px;
  }
}

.tuia-doc-footer {
  height: 32px;
  margin-top: -32px;
  font-size: 14px;
  line-height: 32px;
  color: #4e6e8e;
  text-align: right;
}
</style>
