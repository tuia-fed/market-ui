import MkWheel, { useRotate } from "../../../src/wheel";
import "../../../src/wheel/index.less";
import { delay } from "../../utils";

export default {
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
    async onStart() {
      this.hooks.start();
      await delay(3000);
      this.hooks.to({
        index: 3,
        complete() {},
      });
    },
  },
};
