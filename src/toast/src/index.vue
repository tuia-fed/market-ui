<template>
  <transition name="mk-toast-fade" @after-leave="afterLeave">
    <div class="mk-toast" v-show="visible">{{ message }}</div>
  </transition>
</template>

<script>
export default {
  name: "mk-toast",

  props: {
    /** 显示信息 */
    message: String,
    /** 停留时间 */
    duration: {
      type: Number,
      default: 3000,
    },
    /** 关闭回调 */
    onClose: {
      type: Function,
      default: null,
    },
  },

  data() {
    return {
      /** 是否关闭 */
      closed: false,
      /** 是否可见 */
      visible: true,
    };
  },

  watch: {
    closed(newVal) {
      if (newVal) {
        // 关闭的时候设置状态为不可见
        this.visible = false;
      }
    },
  },

  mounted() {
    // 开始计时器
    this.startTimer();
  },

  methods: {
    startTimer() {
      if (this.duration) {
        this.timer = setTimeout(() => {
          if (!this.closed) {
            this.close();
          }
        }, this.duration);
      }
    },

    clearTimer() {
      if (this.timer) {
        clearTimeout(this.timer);
      }
    },

    close() {
      this.closed = true;
      if (typeof this.onClose === "function") {
        this.onClose(this);
      }
    },

    afterLeave() {
      // 销毁实例
      this.$destroy(true);
      // 移除dom
      this.$el.parentNode.removeChild(this.$el);
    },
  },
};
</script>
