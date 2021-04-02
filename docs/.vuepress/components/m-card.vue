<template>
  <div class="card">
    <div class="head">
      <slot></slot>
    </div>
    <div class="code" v-if="codeVisible">
      <slot name="code"></slot>
    </div>
    <div class="toggle" @click="toggle">
      {{msg}}
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      codeVisible: false
    }
  },

  computed: {
    msg () {
      return this.codeVisible ? '展开代码' : '收起代码'
    }
  },

  methods: {
    toggle() {
      this.codeVisible = !this.codeVisible
    }
  }
}
</script>

<style lang="less">
.card {
  .head {

  }

  .code {

  }

  .toggle {

  }
}
</style>