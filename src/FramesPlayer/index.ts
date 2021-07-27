import { VueConstructor } from "vue";
import FramesPlayer from "./src/index";

(FramesPlayer as any).install = function (Vue: VueConstructor) {
  Vue.component(FramesPlayer.name, FramesPlayer);
};

export default FramesPlayer;
