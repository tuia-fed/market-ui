<template>
  <div class="footer">
    <span class="prefix">上次更新：</span>
    <span class="time">{{ lastUpdated }}</span>
  </div>
</template>
<script>
export default {
  name: 'Footer',
  data() {
    return {
      lastUpdated: ''
    }
  },
  mounted() {
    this.lastUpdated = this.$page.lastUpdated
  }
}
</script>
<style lang="less" scoped>
.footer {
  padding-right: 24px;
}

.prefix {
  font-weight: 500;
  color: #4e6e8e;
}

.time {
  font-weight: 400;
  color: #767676;
}
</style>
