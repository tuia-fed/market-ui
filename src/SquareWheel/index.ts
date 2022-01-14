import { VueConstructor } from 'vue';
import SquareWheel from './src/index';

SquareWheel.install = function (Vue: VueConstructor) {
  Vue.component(SquareWheel.name, SquareWheel);
};

export type SquareWheelRef = InstanceType<typeof SquareWheel>;

export default SquareWheel;
