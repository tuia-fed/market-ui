import { VueConstructor } from "vue";
import Sudoku from "./src/index";
import SudokuOption from "./src/options";

(Sudoku as any).install = function (Vue: VueConstructor) {
  Vue.component(Sudoku.name, Sudoku);
  Vue.component(SudokuOption.name, SudokuOption);
};

(Sudoku as any).Option = SudokuOption;

export default Sudoku;
