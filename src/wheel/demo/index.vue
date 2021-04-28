<template>
  <div class="container">
    <mk-wheel class="wheel" :angle="angle" />
    <div class="btn" @click="onStart"></div>
  </div>
</template>
<script>
import Extend from "./extend";

export default {
  extends: Extend,
};
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
