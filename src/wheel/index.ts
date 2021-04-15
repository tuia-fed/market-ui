import { VueConstructor } from "vue";
import Wheel from "./src/index";

(Wheel as any).install = function (Vue: VueConstructor) {
  Vue.component(Wheel.name, Wheel);
};

export * from "./src/hooks";

export default Wheel;
