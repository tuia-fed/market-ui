import { VueConstructor } from "vue";
import RingToss from "./src/index";

(RingToss as any).install = function (Vue: VueConstructor) {
  Vue.component(RingToss.name, RingToss);
};

export default RingToss;
