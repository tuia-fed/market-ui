<template>
  <div>
    <button @click="onClick">点击</button>
  </div>
</template>

<script>
import Vue from 'vue'
import Toast from '../../../src/toast'
import '../../../src/toast/style/index.less'

Vue.use(Toast)

export default {
  methods: {
    onClick() {
      Toast.show("showToast").then(() => {
        console.log('close')
      })
    }
  }
}
</script>

<style lang="less" scoped>

</style>