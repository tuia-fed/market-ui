<template>
  <div class="page">
    <!-- #region html -->
    <div class="container">
      <div class="wheel">
        <mk-wheel class="wheel-bg" :angle="angle">
          <mk-wheel-option
            v-for="(option, index) in options"
            :key="index"
            :index="index"
            :title="option.title"
            :image="option.image"
            :class="index % 2 === 0 ? 'wheel-option-1' : 'wheel-option-2'"
            @click="onOptionClick"
          ></mk-wheel-option>
        </mk-wheel>
      </div>
      <div class="btn" @click="onStart">
        <div class="btn-inner"></div>
      </div>
    </div>
    <!-- #endregion html -->
    <ul class="messages">
      <li v-for="(item, index) in messages" :key="index">{{ item.msg }}</li>
    </ul>
  </div>
</template>
<script>
// #region js
import { Wheel, useRotate } from "@tuia/market-ui";

export default {
  components: {
    [Wheel.name]: Wheel,
    [Wheel.Option.name]: Wheel.Option,
  },

  data() {
    return {
      angle: 0,
      messages: [],
    };
  },

  created() {
    this.options = [
      {
        title: "一等奖",
        image: "//yun.tuisnake.com/mami-media/img/50d7608a-ociowk8pm5.png",
      },
      {
        title: "二等奖",
        image: "//yun.tuisnake.com/mami-media/img/691aa62e-d5xwaga1hn.png",
      },
      {
        title: "三等奖",
        image: "//yun.tuisnake.com/h5-mami/couponPrize/lucky.png",
      },
      {
        title: "四等奖",
        image: "//yun.tuisnake.com/mami-media/img/8ecabe26-iq6wlrhpam.png",
      },
      {
        title: "五等奖",
        image: "//yun.tuisnake.com/mami-media/img/570a6594-vhcb3jmuz8.png",
      },
      {
        title: "谢谢参与",
        image: "//yun.tuisnake.com/h5-mami/couponPrize/thanks.png",
      },
    ];
  },

  mounted() {
    this.hooks = useRotate((angle) => {
      this.angle = angle;
    });
    this.hooks.idled();
  },

  methods: {
    onStart() {
      this.start(this.hooks);
    },

    onOptionClick(index) {
      this.pushMessage("你点击啦，下标为：" + index);
    },

    start(hooks) {
      const { delay } = this;

      hooks.start();

      delay(() => {
        const index = this.randomInit(this.options.length - 1);
        hooks.to({
          index,
          duration: 3000,
          complete: () => {
            this.pushMessage("你中奖啦，下标为：" + index);
            delay(() => {
              hooks.idled();
            }, 1000);
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

.wheel {
  overflow: hidden;
}

.wheel-bg {
  margin: 0 auto;
}

.wheel-option-1 {
  background-color: #fff;
  color: #f47920;
}

.wheel-option-2 {
  color: #fff;
  background-color: #f47920;
}

.btn {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 90px;
  height: 105px;
  background-repeat: no-repeat;
  background-image: url("http://yun.tuisnake.com/h5-mami/dist/5ee82ba891e04abd3eb7.png");
  background-size: 100%;

  &-inner {
    margin: 12px auto;
    width: 80px;
    height: 80px;
    background-size: 100%;
    background-image: url("//yun.tuisnake.com/h5-mani/marketui16b96b04-0664-4df0-ac02-4d29cf0b5ab2.png");
    animation: wheelBtnhuxi 1s linear infinite;
  }

  @keyframes wheelBtnhuxi {
    0%,
    100% {
      transform: scale(1);
    }
    50% {
      transform: scale(0.85);
    }
  }
}

.messages {
  margin: 0;
  padding: 20px;

  li {
    margin-bottom: 15px;
  }
}
</style>
