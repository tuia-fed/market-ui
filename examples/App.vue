<template>
  <div>
    <!-- 导航栏 -->
    <DemoNav />
    <keep-alive>
      <router-view />
    </keep-alive>
  </div>
</template>
<script>
import DemoNav from './components/DemoNav'

export default {
  name: 'DemoApp',
  components: {
    DemoNav
  }
}
</script>
<style lang="less" scoped>
@import './common/style/base.less';

body {
  min-width: 100vw;
}

::-webkit-scrollbar {
  width: 0;
  background: transparent;
}
</style>
