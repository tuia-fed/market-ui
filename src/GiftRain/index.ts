import { VueConstructor } from "vue";
import GiftRain from "./src/index";

(GiftRain as any).install = function (Vue: VueConstructor) {
  Vue.component(GiftRain.name, GiftRain);
};

export default GiftRain;
