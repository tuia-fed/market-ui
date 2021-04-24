<template>
  <div class="tuia-doc-sidebar" :style="{'top': `${sidebarTop}px`}">
    <div class="tuia-doc-sidebar__group" v-for="item in siteSidebar" :key="item.title">
      <div class="tuia-doc-sidebar__title">{{ enToZhJson(item.title) }}</div>
      <div class="tuia-doc-sidebar__item" v-for="child in item.children" :key="child.title">
        <!-- to的路径需要加上`/`，否则路由会拼接，无法导航到正确路由 -->
        <router-link :to="`/${child.children[0]}`" v-if="child.title">{{ enToZhJson(child.title) }}</router-link>
      </div>
    </div>
  </div>
</template>
<script>
/* sidebar中英文混合对照json */
import titleZhEnJson from '../../../sidebar.json'

export default {
  name: 'Sider',
  data: () => ({
    siteSidebar: [],
    titleZhEnJson
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
    enToZhJson(val) {
      const { titleZhEnJson } = this
      const zhList = titleZhEnJson.zh
      const enList = titleZhEnJson.en
      const zhIndex = enList.findIndex(item => item === val)
      return zhList[zhIndex]
    }
  },
  mounted() {
    // 对sidebar排序,引导路由始终置顶
    this.siteSidebar = this.$site.themeConfig.sidebar
    const sortSitebar = (arr) => {
      const guideIndex = arr.findIndex(item => item.title === 'Guide')
      const guideItem = arr[guideIndex]
      arr.splice(guideIndex, 1)
      arr.unshift(guideItem)
      return arr
    }
    this.siteSidebar = sortSitebar(this.siteSidebar)
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
