<template>
  <div class="page">
    <div class="presets">
      <button
        v-for="item in presetList"
        :key="item.key"
        class="common-button primary"
        :disabled="item.key === preset"
        @click="change(item.key)"
      >
        {{ item.name }}
      </button>
    </div>
    <!-- #region html -->
    <div class="container">
      <div class="wheel" :style="wheelSize">
        <component
          :is="preset"
          ref="wheel"
          :prizeList="prizeList"
          @stateChange="stateChange"
          @clickStart="clickStart"
          @prizeClick="prizeClick"
        />
        <div class="info">
          <p>当前状态：{{ state }}</p>
          <p>当前点击：{{ clickPrize }}</p>
        </div>
      </div>
    </div>
    <!-- #endregion html -->
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
import { WheelFoundation, StateConstant } from '@tuia/market-ui';

const { Red, Yellow, Blue, Green } = WheelFoundation.Presets;
const AllList = [
  {
    key: WheelFoundation.name,
    name: '默认',
    comp: WheelFoundation,
  },
  {
    key: 'red',
    name: '红色',
    comp: Red,
  },
  {
    key: 'yellow',
    name: '黄色',
    comp: Yellow,
  },
  {
    key: 'blue',
    name: '蓝色',
    comp: Blue,
  },
  {
    key: 'green',
    name: '绿色',
    comp: Green,
  },
];
const components = {};
AllList.forEach((it) => (components[it.key] = it.comp));

export default {
  components,

  data() {
    return {
      angle: 0,
      messages: [],
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
      presetList: AllList.map((it) => ({ key: it.key, name: it.name })),
      preset: AllList[0].key,
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

    change(preset) {
      this.disable();
      this.preset = preset;
    },
  },
};
// #endregion js
</script>
<style lang="less" scoped>
.page {
  padding-top: 20px;
}

.container {
  position: relative;
}

.presets {
  margin-bottom: 10px;
}

.wheel {
  height: 500px;

  .info {
    position: absolute;
    padding: 5px;
    font-size: 12px;
    background-color: #ccc5;
    border-radius: 5px;
  }
}
</style>
