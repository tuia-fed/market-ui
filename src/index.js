import wheel from "./wheel";
import toast from "./toast";

const components = {
  wheel,
  toast,
};

function install(Vue) {
  Object.keys(components).forEach((key) => {
    Vue.use(components[key]);
  });
}

if (typeof window !== undefined && window.Vue) {
  install(window.Vue);
}

export default { install, wheel, toast };
