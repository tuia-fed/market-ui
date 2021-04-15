<template>
  <div class="tuia-doc-navbar">
    <div class="tuia-doc-row">
      <div class="tuia-doc-header__top">
        <!-- logo -->
        <a class="tuia-doc-header__logo" href="/">
          <img src="../assets/logo.png" alt="">
          <span>MarketUI</span>
        </a>
        <!-- search -->
        <div class="tuia-doc-header__search">
          <SearchBox />
        </div>
        <ul class="tuia-doc-header__top-nav">
          <li class="tui-doc-header__top-nav-item">
            <a href="http://gitlab.dui88.com/tuia-frontend/tuia-activity-frontend/market-ui" target="_blank">
              <img src="../assets/github.svg" alt="">
            </a>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
/* 官方提供的搜索组件 */
import SearchBox from '@SearchBox'

export default {
  name: "NavBar",
  components: {
    SearchBox
  }
}
</script>
<style lang="less" scoped>
.inlineVertical {
  display: inline-block;
  vertical-align: middle;
}

.tuia-doc {
  &-navbar {
    width: 100%;
    background-color: #001938;
    -webkit-user-select: none;
    user-select: none;
  }
  &-row {
    width: 100%;
  }
  &-header__top {
    display: flex;
    display: -webkit-flex;
    align-items: center;
    padding: 0 30px;
    height: 60px;
    line-height: 60px;
    &-nav {
      flex: 1;
      -webkit-box-flex: 1;
      font-size: 0;
      text-align: right;
      & > li {
        position: relative;
        font-size: 18px;
        color: #fff;
        margin-left: 20px;
        .inlineVertical();
        img {
          display: block;
          width: 26px;
          height: 26px;
        }
      }
    }
  }
  &-header__logo {
    display: block;
    & > img {
      width: 24px;
      .inlineVertical();
      margin-right: 10px;
    }
    & > span {
      font-size: 22px;
      color: #fff;
      .inlineVertical();
    }
  }
  &-header__search {
    margin-left: 200px;
  }
}
</style>
