<template>
  <iframe ref="iframe" :src="src" :style="simulatorStyle" frameborder="0" />
</template>
<script>

export default {
  name: 'Simulator',
  props: {
    src: String
  },
  data: () => ({
    windowHeight: 0
  }),
  computed: {
    simulatorStyle() {
      const height = Math.min(640, this.windowHeight - 90)
      const basicStyle = {
        display: 'block',
        width: '100%'
      }
      return Object.assign({height: `${height}px`}, basicStyle)
    }
  },
  mounted() {
    window.addEventListener('resize', () => {
      this.windowHeight = window.innerHeight
    })

    this.windowHeight = window.innerHeight
  }
}
</script>
