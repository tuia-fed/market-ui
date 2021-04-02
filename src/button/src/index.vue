<template>
  <div class="mk-main">
    <m-primary />
  </div>
</template>

<script>
import MPrimary from "./primary.vue";

export default {
  name: "mk-button",
  components: {
    MPrimary,
  },
};
</script>

<style lang="less">
@size: 14px;

.mk {
  &-button {
    font-size: @size;
  }
}
</style>
