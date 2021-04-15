<template>
  <div class="tuia-doc-sidebar" :style="{'top': `${sidebarTop}px`}">
    <div class="tuia-doc-sidebar__group" v-for="item in $site.themeConfig.sidebar" :key="item.title">
      <div class="tuia-doc-sidebar__title">{{ item.title }}</div>
      <div class="tuia-doc-sidebar__item" v-for="child in item.children" :key="child">
        <a :href="pagePathFilter(child)[0]">{{ pagePathFilter(child)[1] }}</a>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'Sider',
  data: () => ({
    totalPages: []
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
  methods: {
    pagePathFilter(page) {
      let filterPage = ''
      if (this.totalPages.length) {
        filterPage = this.totalPages.find(item => item.relativePath === page)
        const { path, title } = filterPage
        return [path, title]
      }
      return []
    }
  },
  mounted() {
    this.totalPages = this.$site.pages
  }
}
</script>
<style lang="less" scoped>
.tuia-doc-sidebar {
  position: fixed;
  left: 0;
  top: 60px;
  bottom: 0;
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
    color: #455a64;
    font-weight: 600;
    font-size: 15px;
    line-height: 28px;
  }
  &__item {
    position: relative;
    & > a {
      display: block;
      margin: 0;
      padding: 8px 0 8px 30px;
      color: #455a64;
      font-size: 14px;
      line-height: 28px;
      transition: color 0.2s;
    }
  }
}
</style>
