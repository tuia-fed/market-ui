import Toast from "./src/index.vue";

let _vue;
let ToastComponent;

function showToast(message) {
  if (_vue === undefined) {
    throw Error("please install Toast");
  }
  if (ToastComponent === undefined) {
    ToastComponent = _vue.extend(Toast);
  }
  return new Promise((resolve) => {
    const toast = new ToastComponent({
      propsData: {
        message,
        onClose: resolve,
      },
    });
    toast.$mount();
    document.body.appendChild(toast.$el);
  });
}

Toast.install = function (Vue) {
  _vue = Vue;
  Vue.component(Toast.name, Toast);
};

Toast.show = showToast;

export default Toast;
