import { VueConstructor } from 'vue';
import Wheel from '../Wheel';
import WheelFoundation from './src/index';
import Presets from './presets';

WheelFoundation.install = function (Vue: VueConstructor) {
  Vue.component(Wheel.name, Wheel);
  Vue.component(WheelFoundation.name, WheelFoundation);
};

Object.keys(Presets).forEach(key => {
  if (!WheelFoundation.Presets) {
    WheelFoundation.Presets = {};
  }
  WheelFoundation.Presets[key] = {
    extends: WheelFoundation,
    props: Presets[key],
  };
});

export default WheelFoundation;
