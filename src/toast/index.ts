import Vue, { VueConstructor } from "vue";
import Toast from "./src/index";

type toastType = {
  position?: string;
  showToast?: boolean;
  msg: string;
  color?: string;
  bg?: string;
  duration?: number;
};

const ToastConstructor = Vue.extend(Toast);

(Toast as any).install = function (Vue: VueConstructor) {
  // 如果toast还在，则不再执行
  if (document.getElementsByClassName("toast_pane").length) {
    return;
  }
  // const toastTpl = Vue.extend(Toast);
  const $vm: any = new ToastConstructor(); // 实例化vue实例
  const tpl = $vm.$mount().$el;
  document.body.appendChild(tpl);

  Vue.prototype.$mkToast = {
    show: function (options: string | toastType) {
      if (document.getElementsByClassName("toast_pane").length) {
        return;
      }

      if (typeof options === "string") {
        $vm.msg = options; // 传入props
        $vm.position = "middle";
        $vm.bg = "rgba(0,0,0,.6)";
        $vm.color = "#fff";
        $vm.showToast = true;
        setTimeout(() => {
          $vm.showToast = false;
        }, 2500);
      } else if (typeof options === "object") {
        Object.assign($vm, options);
        $vm.showToast = true;
        if (!options.bg && options.position && options.position !== "top") {
          $vm.bg = "rgba(0, 0, 0, .7)";
        } else {
          $vm.bg = "rgba(250, 100, 100, .9)";
        }
        if (options.duration) {
          setTimeout(() => {
            $vm.showToast = false;
          }, options.duration);
        } else {
          setTimeout(() => {
            $vm.showToast = false;
          }, 2500);
        }
      }
    },
    hide: function () {
      $vm.showToast = false;
    },
  };
};

export default Toast;
