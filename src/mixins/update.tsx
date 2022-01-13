import Vue from "vue";

const getNowTime = () => {
  // if (performance && performance.now) {
  //   return performance.now()
  // }
  return Date.now();
};

export default Vue.extend({
  data() {
    return {
      update_time: 0,
    };
  },
  created() {
    this.update_time = getNowTime();
    this.registerUpdate();
  },
  methods: {
    // eslint-disable-next-line
    update(dt: number) {},
    registerUpdate() {
      const dt = getNowTime() - this.update_time;
      // 控制最大 100 帧
      if (dt > 10) {
        this.update(dt / 1000);
        this.update_time += dt;
      }
      requestAnimationFrame(this.registerUpdate.bind(this));
    },
  },
});
