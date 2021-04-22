<template>
  <div class="demo-home-nav">
    <div class="demo-home-nav__group">
      <router-link
        class="demo-home-nav__block"
        v-for="navItem in group"
        :key="navItem.path"
        :to="`${navItem.path}`"
      >
        {{ navItem.name }}
        <arrow-right class="demo-home-nav__icon" />
      </router-link>
    </div>
  </div>
</template>

<script>
import ArrowRight from './ArrowRight';

export default {
  components: {
    ArrowRight,
  },

  props: {
    group: Array,
  }
}
</script>

<style lang="less">

.demo-home-nav {

  &__block {
    position: relative;
    display: flex;
    margin: 0 0 12px;
    padding-left: 20px;
    color: #323233;
    font-weight: 600;
    font-size: 14px;
    line-height: 40px;
    background: #f7f8fa;
    border-radius: 99px;
    transition: background 0.3s;
    text-decoration: none;

    &:hover {
      background: darken(#f7f8fa, 3%);
    }

    &:active {
      background: darken(#f7f8fa, 6%);
    }
  }

  &__icon {
    position: absolute;
    top: 50%;
    right: 16px;
    width: 16px;
    height: 16px;
    margin-top: -8px;
  }
}
</style>
