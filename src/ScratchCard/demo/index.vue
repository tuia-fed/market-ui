<template>
  <div class="page">
    <div class="container">
      <div class="samples">
        <button :disabled="sample === 0" @click="change(0)">普通形式</button>
        <button :disabled="sample === 1" @click="change(1)">
          不触发自动刮
        </button>
      </div>
      <div class="scratch">
        <!-- #region html -->
        <mk-scratch-card
          ref="card"
          :enableAutoScratch="sample === 0"
          @stateChange="stateChange"
          @clickStart="clickStart"
        />
        <!-- #endregion html -->
        <div class="info">
          <p>当前状态：{{ state }}</p>
        </div>
      </div>
    </div>
    <demo-block card title="基础操作">
      <button
        class="common-button primary"
        :disabled="!canStart"
        @click="autoScratch"
      >
        自动刮
      </button>
      <button class="common-button primary" @click="reset">重置</button>
      <button class="common-button primary" @click="disable">禁用</button>
    </demo-block>
  </div>
</template>
<script>
// #region js
import { StateConstant } from '@tuia/market-ui';

export default {
  data() {
    return {
      state: 0,
      sample: 0,
      wait: null,
    };
  },

  computed: {
    canStart() {
      return this.state === StateConstant.WAIT_START;
    },
  },

  methods: {
    stateChange(opt) {
      this.state = opt.now;
    },
    clickStart(wait) {
      this.wait = wait;
      this.waitEnd();
    },
    autoScratch() {
      this.$refs.card.start();
    },
    reset() {
      this.$refs.card.reset();
    },
    disable() {
      this.$refs.card.disable();
    },
    change(v) {
      this.disable();
      this.sample = v;
      this.reset();
    },
    async waitEnd() {
      console.log('开始刮了');
      await this.wait;
      console.log('挂完了');
    },
  },
};
// #endregion js
</script>
<style lang="less" scoped>
.page {
  padding-top: 20px;
  overflow: hidden;
}

.container {
  position: relative;
}

.samples {
  margin-bottom: 10px;
}

button {
  font-size: 4vw;
}

.scratch {
  position: relative;
  width: 100vw;
  height: 62vw;

  .info {
    position: absolute;
    padding: 5px;
    font-size: 1.6vw;
    background-color: #ccc5;
    border-radius: 5px;
  }
}
</style>
