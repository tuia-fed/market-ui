import button from "./src/index.vue";

button.install = function (Vue) {
  Vue.components(button.name, button);
};

export default button;
