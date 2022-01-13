<template>
  <div class="page">
    <div class="container">
      <div class="samples">
        <button :disabled="sample === 0" @click="change(0)">普通形式</button>
        <button :disabled="sample === 1" @click="change(1)">
          高级定制(不均分转盘)
        </button>
      </div>
      <div class="wheel" :style="wheelSize">
        <!-- #region html1 -->
        <mk-wheel
          v-if="sample === 0"
          ref="wheel"
          :key="sample"
          :prizeList="prizeList"
          @stateChange="stateChange"
          @clickStart="clickStart"
          @prizeClick="prizeClick"
        >
        </mk-wheel>
        <!-- #endregion html1 -->
        <!-- #region html2 -->
        <mk-wheel
          v-else
          ref="wheel"
          :key="sample"
          :prizeList="prizeList"
          :prizePercent="[70, 70, 50, 70, 30, 70]"
          containerImg="//yun.tuisnake.com/market-ui/872894c9-c2e9-4206-b821-59dde2eac08d.png"
          rotateImg="//yun.tuisnake.com/market-ui/f1395e69-e3a9-4f0f-a8a7-5b89b21d86a7.png"
          @stateChange="stateChange"
          @clickStart="clickStart"
          @prizeClick="prizeClick"
        >
          <template #light>
            <div></div>
          </template>
          <template #prize="{ index, item }">
            <div v-if="index === 3" class="word">{{ item.title }}</div>
          </template>
        </mk-wheel>
        <!-- #endregion html2 -->
        <div class="info">
          <p>当前状态：{{ state }}</p>
          <p>当前点击：{{ clickPrize }}</p>
        </div>
      </div>
    </div>
    <demo-block card title="基础操作">
      <button
        class="common-button primary"
        :disabled="!canStart"
        @click="clickStart"
      >
        开始
      </button>
      <button class="common-button primary" @click="reset">重置</button>
      <button class="common-button primary" @click="disable">禁用</button>
      <button
        v-for="(item, index) in prizeList"
        :key="index"
        class="common-button primary"
        :disabled="!canStop"
        @click="stop(index)"
      >
        {{ item.title }}
      </button>
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
      clickPrize: '',
      prizeList: [
        {
          title: '一等奖',
          image: '//yun.tuisnake.com/mami-media/img/50d7608a-ociowk8pm5.png',
        },
        {
          title: '二等奖',
          image: '//yun.tuisnake.com/mami-media/img/691aa62e-d5xwaga1hn.png',
        },
        {
          title: '三等奖',
          image: '//yun.tuisnake.com/h5-mami/couponPrize/lucky.png',
        },
        {
          title: '四等奖',
          image: '//yun.tuisnake.com/mami-media/img/8ecabe26-iq6wlrhpam.png',
        },
        {
          title: '五等奖',
          image: '//yun.tuisnake.com/mami-media/img/570a6594-vhcb3jmuz8.png',
        },
        {
          title: '谢谢参与',
          image: '//yun.tuisnake.com/h5-mami/couponPrize/thanks.png',
        },
      ],
      wheelSize: {},
      sample: 0,
    };
  },

  computed: {
    canStart() {
      return this.state === StateConstant.WAIT_START;
    },
    canStop() {
      return this.state === StateConstant.WAIT_END;
    },
  },

  mounted() {
    const { width, height } = this.$refs.wheel.$el.style;
    this.wheelSize = { width, height };
  },

  methods: {
    prizeClick({ item }) {
      this.clickPrize = item.title;
    },

    stateChange(opt) {
      this.state = opt.now;
    },

    async clickStart() {
      const wheel = this.$refs.wheel;
      if (wheel.getState() !== StateConstant.WAIT_START) {
        return;
      }
      await wheel.start();
    },

    async stop(index) {
      await this.$refs.wheel.stop({ index });
    },

    async reset() {
      await this.$refs.wheel.reset();
    },

    disable() {
      this.$refs.wheel.disable();
    },

    change(v) {
      this.disable();
      this.sample = v;
      this.reset();
    },
  },
};
// #endregion js
</script>
<style lang="less" scoped>
.page {
  padding: 20px 0;
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

.wheel {
  position: relative;

  .info {
    position: absolute;
    padding: 5px;
    font-size: 1.6vw;
    background-color: #ccc5;
    border-radius: 5px;
  }

  .word {
    position: absolute;
    top: -36vw;
    font-size: 5vw;
    font-weight: bold;
    color: red;
    transform: translate(-50%);
  }
}
</style>
