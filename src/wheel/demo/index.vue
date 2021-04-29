<template>
<!-- #region html -->
  <div class="container">
    <mk-wheel class="wheel" :angle="angle" />
    <div class="btn" @click="onStart"></div>
  </div>
<!-- #endregion html -->
</template>
<script>
// #region js
import { wheel } from "@tuia/market-ui";

export default {
  components: {
    MkWheel: wheel,
  },

  data() {
    return {
      angle: 0,
    };
  },

  mounted() {
    this.hooks = wheel.useRotate((angle) => {
      this.angle = angle;
    });
    this.hooks.idled();
  },

  methods: {
    onStart() {
      this.hooks.start();

      setTimeout(() => {
        this.hooks.to({
          index: 3,
          complete() {
            console.log("中奖啦");
          },
        });
      }, 3000);
    },
  },
};
// #endregion js
</script>
<style lang="less" scoped>
.container {
  position: relative;
}

.wheel {
  margin: 0 auto;
  background-image: url("//yun.dui88.com/h5-mani/marketui0a61051e-112a-4496-9961-2076099a1389.png");
  background-size: 100%;
}

.btn {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 80px;
  height: 80px;
  background-image: url("//yun.dui88.com/h5-mani/marketui16b96b04-0664-4df0-ac02-4d29cf0b5ab2.png");
  background-size: 100%;
}
</style>
