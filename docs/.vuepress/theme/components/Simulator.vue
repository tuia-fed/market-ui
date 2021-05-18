<template>
  <div class="tuia-doc-simulator" :class="{'tuia-doc-simulator-fixed': isTopFixed}">
    <iframe ref="iframe" :src="src" :style="simulatorStyle" frameborder="0" />
  </div>
</template>
<script>

export default {
  name: 'Simulator',
  props: {
    isTopFixed: Boolean,
    src: String
  },
  data: () => ({
    windowHeight: window.innerHeight
  }),
  computed: {
    simulatorStyle() {
      const height = Math.min(640, this.windowHeight - 90)
      return {
        height: `${height}px`
      }
    }
  },
  mounted() {
    window.addEventListener('resize', () => {
      this.windowHeight = window.innerHeight
    })
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
iframe {
  display: block;
  width: 100%;
}
</style>
