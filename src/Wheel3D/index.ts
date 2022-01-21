import { VueConstructor } from 'vue';
import Wheel3D from './src/index';

Wheel3D.install = function (Vue: VueConstructor) {
  Vue.component(Wheel3D.name, Wheel3D);
};

export type Wheel3DRef = InstanceType<typeof Wheel3D>;

export default Wheel3D;
