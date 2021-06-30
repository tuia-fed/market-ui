import { VueConstructor } from "vue";
import {{component}} from "./src/index";

({{component}} as any).install = function (Vue: VueConstructor) {
  Vue.component({{component}}.name, {{component}});
};

export default {{component}};
