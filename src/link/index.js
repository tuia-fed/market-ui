import link from "./src/index.vue";

link.install = function (Vue) {
  Vue.components(link.name, link);
};

export default link;
