import Wheel from "./src/index.vue";

Wheel.install = function (Vue) {
  Vue.component(Wheel.name, Wheel);
};

export * from "./hooks";

export default Wheel;
