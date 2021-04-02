import button from "./button";
import link from "./link";

const components = {
  button,
  link,
};

function install(Vue) {
  Object.keys(components).forEach((key) => {
    Vue.use(components[key]);
  });
}

if (typeof window !== undefined && window.Vue) {
  install(window.Vue);
}

export default { install, button, link };
