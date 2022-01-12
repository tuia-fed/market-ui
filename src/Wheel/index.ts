import { VueConstructor } from 'vue';
import Wheel from './src/index';

Wheel.install = function (Vue: VueConstructor) {
  Vue.component(Wheel.name, Wheel);
};

export type WheelRef = InstanceType<typeof Wheel>;

export default Wheel;
