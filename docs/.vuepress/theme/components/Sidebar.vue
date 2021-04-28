<template>
  <div class="tuia-doc-sidebar" :style="{'top': `${sidebarTop}px`}" v-if="sitebarRoutes">
    <div class="tuia-doc-sidebar__group" v-for="item in sitebarRoutes" :key="item.group">
      <div class="tuia-doc-sidebar__title">{{ item.group | groupTitle }}</div>
      <div class="tuia-doc-sidebar__item" v-for="child in item.children" :key="child.title">
        <!-- to的路径需要加上`/`，否则路由会拼接，无法导航到正确路由 -->
        <router-link :to="`${child.path}`" v-if="child.title">{{ child.title }}</router-link>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'Sider',
  data: () => ({
    sitebarRoutes: []
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
  filters: {
    groupTitle(val) {
      const titleExp = new RegExp(/\|/, 'g')
      if (titleExp.test(val)) {
        return val.split('|')[1].trim()
      }
      return val
    }
  },
  methods: {
    groupSidebarRouter(pages) {
      const frontmatterGroupList = []
      // 分组
      pages.forEach(item => {
        const { frontmatter } = item // 页面自定义配置
        if (!frontmatterGroupList.includes(frontmatter.group)) {
          frontmatterGroupList.push(frontmatter.group)
        }
      })
      // 排序
      const sidebarGroups = frontmatterGroupList.map(item => {
        const groupChild = pages.filter(page => page.frontmatter.group === item)
        // 分组子路由根据level进行内部排序
        groupChild.sort((a, b) => a.frontmatter.level - b.frontmatter.level)
        const groupObj = {
          group: item,
          children: [...groupChild]
        }
        return groupObj
      })
      // 再次排序
      sidebarGroups.sort((a, b) => {
        const groupLevel = (item) => {
          const { group } = item
          const level = Number(group.split('|')[0].trim())
          return level
        }
        return groupLevel(a) - groupLevel(b)
      })
      return sidebarGroups
    }
  },
  mounted() {
    // 筛选非首页-侧边栏路由
    const sitePages = this.$site.pages.filter(item => item.path !== '/')
    // 分组
    this.sitebarRoutes = this.groupSidebarRouter(sitePages)
    // 分组对象挂载到window对象——用于demo服务
    window.sitebarRoutes = this.sitebarRoutes
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
