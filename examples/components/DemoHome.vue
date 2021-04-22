<template>
  <div class="demo-home">
    <h1 class="demo-home__title">
      <img src="//yun.dui88.com/h5-mani/marketuibed47dbb-c6aa-4b7d-ab79-d281e0805c0f.png" alt="">
      <span>MarketUI</span>
    </h1>
    <h2 class="demo-home__desc">
      轻量、可靠的移动端组件库
    </h2>
    <template>
      <demo-home-nav :group="group" />
    </template>
  </div>
</template>
<script>
import DemoHomeNav from './DemoHomeNav'

export default {
  name: 'DemoHome',
  components: {
    DemoHomeNav
  },
  data: () => ({
    group: []
  }),
  mounted() {
    const groups = this.$router.options.routes
    // 过滤首页
    this.group = groups.filter(item => item.path !== '/')
  },
}
</script>
<style lang="less" scoped>
.demo-home {
  box-sizing: border-box;
  width: 100%;
  min-height: 100vh;
  padding: 46px 20px 20px;
  background: #fff;

  &__title,
  &__desc {
    padding-left: 16px;
    font-weight: normal;
    line-height: 1;
    user-select: none;
  }

  &__title {
    margin: 0 0 16px;
    font-size: 32px;

    img,
    span {
      display: inline-block;
      vertical-align: middle;
    }

    img {
      width: 32px;
    }

    span {
      margin-left: 16px;
    }

    &--small {
      font-size: 24px;
    }
  }

  &__desc {
    margin: 0 0 40px;
    color: rgba(69, 90, 100, 0.6);
    font-size: 14px;
  }
}
</style>
