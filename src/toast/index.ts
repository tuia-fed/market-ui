import { VueConstructor } from "vue";
import Toast from "./src/index";

(Toast as any).install = function (Vue: VueConstructor) {
  // 如果toast还在，则不再执行
  if (document.getElementsByClassName("toast_pane").length) {
    return;
  }
  const toastTpl = Vue.extend(Toast);
  const $vm: any = new toastTpl(); // 实例化vue实例
  const tpl = $vm.$mount().$el;
  document.body.appendChild(tpl);

  Vue.prototype.$toast = {
    show: function (options: string) {
      if (document.getElementsByClassName("toast_pane").length) {
        return;
      }

      if (typeof options === "string") {
        $vm.message = options; // 传入props
        $vm.position = "middle";
        $vm.type = "";
        $vm.background = "rgba(0,0,0,.6)";
        $vm.color = "#fff";
        $vm.isOrigin = true;
        $vm.showToast = true;
        $vm.isOrigin = false;
        setTimeout(() => {
          $vm.showToast = false;
        }, 2500);
      }
    },
  };
};

export default Toast;
