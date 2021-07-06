<template>
  <demo-section>
    <demo-block>
      <!-- #region html -->
      <mk-sudoku
        :activeIndex="activeIndex"
        :options="prizeOptions"
        :rowsAmount="rowsAmount"
        @itemClick="handleClick"
      >
        <div class="start" @click="onStart"></div>
      </mk-sudoku>
      <!-- #endregion html -->
      <!-- hand -->
      <div class="hand" v-show="isShowHand"></div>
    </demo-block>
    <demo-block>
      <ul class="messages">
        <li v-for="(item, index) in messages" :key="index">{{ item.msg }}</li>
      </ul>
    </demo-block>
  </demo-section>
</template>
<script>
// #region js
import { useChange, Sudoku } from "@tuia/market-ui";

export default {
  components: {
    [Sudoku.name]: Sudoku,
    [Sudoku.Option.name]: Sudoku.Option,
  },

  data() {
    return {
      activeIndex: 99,
      size: 88,
      rowsAmount: 3,
      messages: [],
      isShowHand: true,
    };
  },

  mounted() {
    this.hooks = useChange({
      onUpdate: (index) => {
        this.activeIndex = index;
      },
      rows: 3,
    });
    this.hooks.idled();
  },

  methods: {
    onStart() {
      this.isShowHand = false;
      this.start(this.hooks);
    },

    start(hooks) {
      const { delay } = this;
      hooks.start();
      delay(() => {
        const index = this.randomInit(this.prizeOptions.length - 1);
        hooks.toChange({
          index,
          duration: 1500,
          complete: () => {
            this.isShowHand = true;
            this.pushMessage("你中奖啦，下标为：" + index);
            delay(() => {
              hooks.idled();
            }, 1200);
          },
        });
      });
    },

    delay(success, duration = 3000) {
      setTimeout(success, duration);
    },

    randomInit(max, min = 0) {
      return Math.floor(Math.random() * (max - min)) + min;
    },

    pushMessage(msg) {
      this.messages.push({
        msg,
      });
    },

    handleClick(index) {
      this.pushMessage("你点击啦，下标为：" + index);
    },
  },

  created() {
    this.prizeOptions = [
      {
        image: "//yun.tuisnake.com/mami-media/img/50d7608a-ociowk8pm5.png",
        index: 0,
      },
      {
        image: "//yun.tuisnake.com/mami-media/img/691aa62e-d5xwaga1hn.png",
        index: 1,
      },
      {
        image: "//yun.tuisnake.com/h5-mami/couponPrize/lucky.png",
        index: 6,
      },
      {
        image: "//yun.tuisnake.com/mami-media/img/8ecabe26-iq6wlrhpam.png",
        index: 3,
      },
      {
        image: "//yun.tuisnake.com/mami-media/img/570a6594-vhcb3jmuz8.png",
        index: 7,
      },
      {
        image: "//yun.tuisnake.com/h5-mami/couponPrize/thanks.png",
        index: 5,
      },
      {
        image: "//yun.tuisnake.com/mami-media/img/50d7608a-ociowk8pm5.png",
        index: 2,
      },
      {
        image: "//yun.tuisnake.com/mami-media/img/50d7608a-ociowk8pm5.png",
        index: 4,
      },
    ];
  },
};
// #endregion js
</script>
<style lang="less" scoped>
.primary {
  margin-top: 12px;
  color: #fff;
  background-color: #409eff;
  border-color: #409eff;
}

.start {
  width: 80px;
  height: 80px;
  background-image: url("https://yun.dui88.com/h5-mani/turnrect_direct104f3df2-a15e-4758-aa07-35abf539d748.png");
  background-repeat: no-repeat;
  background-size: 100% 100%;

  &:active {
    -webkit-box-shadow: 0 0 40px #5d2f0d inset;
    -moz-box-shadow: 0 0 40px #5d2f0d inset;
    box-shadow: 0 0 40px #5d2f0d inset;
  }
}

.hand {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 56px;
  height: 73px;
  pointer-events: none;
  background-image: url("//yun.dui88.com/h5-mani/turnrect_direct5ac6d981-6651-4bc5-917b-ee847efbedd4.png");
  background-repeat: no-repeat;
  background-size: 100% auto;
  transform-origin: 100% 100%;
  animation: turncircleHandMove 0.8s linear 0s infinite alternate;
}

@keyframes turncircleHandMove {
  0%,
  80%,
  100% {
    transform: rotate(0);
  }

  40% {
    transform: rotate(30deg);
  }
}
</style>
