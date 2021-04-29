import Vue from "vue";
import MkWheel, { useRotate } from "../index";
// #region snippet
export default Vue.extend({
  components: {
    MkWheel,
  },

  data() {
    return {
      angle: 0,
    };
  },

  mounted() {
    this.hooks = useRotate((angle) => {
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
});
// #endregion snippet
