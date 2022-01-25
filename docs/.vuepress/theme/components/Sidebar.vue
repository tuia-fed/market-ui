<template>
  <div class="tuia-doc-sidebar" :style="{'top': `${sidebarTop}px`}" v-if="routers">
    <div class="tuia-doc-sidebar__group" v-for="item in routers" :key="item.title">
      <div class="tuia-doc-sidebar__title">{{ item.title }}</div>
      <div class="tuia-doc-sidebar__item" v-for="child in item.items" :key="child.title">
        <!-- to的路径需要加上`/`，否则路由会拼接，无法导航到正确路由 -->
        <router-link :to="`/${child.path}`" v-if="child.title">{{ child.title }}</router-link>
      </div>
    </div>
  </div>
</template>
<script>
const config = require('../../../../mkui.config');

export default {
  name: 'Sidebar',
  data: () => ({
    routers: config.site.nav,
  }),
  props: {
    /* 滚动条高度 */
    scrollTop: {
      type: Number,
      default: 0
    }
  },
  computed: {
    sidebarTop() {
      const remainTop = 60 - parseFloat(this.scrollTop)
      return remainTop > 0 ? remainTop : 0
    }
  },
}
</script>
<style lang="less" scoped>
.tuia-doc-sidebar {
  position: fixed;
  top: 60px;
  bottom: 0;
  left: 122px;
  z-index: 1;
  min-width: 220px;
  max-width: 220px;
  padding: 24px 0 72px;
  overflow-y: scroll;
  background-color: #fff;
  box-shadow: 0 8px 12px #ebedf0;

  &__group {
    margin-bottom: 16px;
  }

  &__title {
    padding: 8px 0 8px 30px;
    font-size: 15px;
    font-weight: 600;
    line-height: 28px;
    color: #455a64;
  }

  &__item {
    position: relative;

    & > a {
      display: block;
      padding: 8px 0 8px 30px;
      margin: 0;
      font-size: 14px;
      line-height: 28px;
      color: #455a64;
      transition: color 0.2s;
    }
  }
}
</style>
