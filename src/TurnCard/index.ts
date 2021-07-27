import { VueConstructor } from "vue";
import TurnCard from "./src/index";

(TurnCard as any).install = function (Vue: VueConstructor) {
  Vue.component(TurnCard.name, TurnCard);
};

export default TurnCard;
