import { VueConstructor } from "vue";
import ScratchCard from "./src/index";

(ScratchCard as any).install = function (Vue: VueConstructor) {
  Vue.component(ScratchCard.name, ScratchCard);
};

export default ScratchCard;
