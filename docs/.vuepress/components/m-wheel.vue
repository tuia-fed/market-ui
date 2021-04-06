<template>
  <div class="container">
    <mk-wheel class="wheel" :angle="angle">

    </mk-wheel>
    <div class="btn" @click="onStart"></div>
  </div>
</template>

<script>
import MkWheel, { useRotate } from '../../../src/wheel'
import '../../../src/wheel/style/index.less'
import Toast from '../../../src/toast'
import '../../../src/toast/style/index.less'

import { delay } from '../../utils'

export default {
  components: {
    MkWheel
  },

  data() {
    return {
      angle: 0
    }
  },

  mounted() {
    this.hooks = useRotate(angle => {
      this.angle = angle
    })
    this.hooks.idled()
  },

  methods: {
    async onStart() {
      this.hooks.start()
      await delay(3000)
      this.hooks.to({
        index: 3,
        complete() {
          Toast.show('中奖啦')
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
.container {
  position: relative;
}

.wheel {
  margin: 0 auto;
  background-image: url('../../static/bgImage.png');
}

.btn {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 80px;
  height: 80px;
  background-image: url('../../static/btnImage.png');
  background-size: 100%;
}
</style>