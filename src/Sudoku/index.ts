import { VueConstructor } from "vue";
import Sudoku from "./src/index";

(Sudoku as any).install = function (Vue: VueConstructor) {
  Vue.component(Sudoku.name, Sudoku);
};

export default Sudoku;
