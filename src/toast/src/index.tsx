import Vue from "vue";

export default Vue.extend({
  name: "mk-toast",

  data: () => ({
    position: "top",
    animate: "slideMiddle",
    showToast: false,
    msg: "",
    color: "#fff",
    bg: "rgba(0, 0, 0, 0.6)",
    toJSON: "",
    duration: 2500,
    styleContent: {},
  }),

  computed: {
    transitionFn(): string {
      const position = this.position;
      let ani = "slideMiddle";
      if (position == "top") {
        ani = "slidetop";
      } else if (position == "middle") {
        ani = "slideMiddle";
      } else if (position == "bottom") {
        ani = "slideBottom";
      } else {
        ani = "slideMiddle";
      }
      return ani;
    },
    styleC(): object {
      const s = {
        color: this.color,
        background: this.bg,
      };
      const t = Object.assign(s, this.styleContent);
      return t;
    },
  },

  render() {
    return (
      <transition name={this.transitionFn} mode="out-in">
        {this.showToast ? (
          <div
            class={[
              "toast_pane",
              "common_font",
              "typeStyle",
              this.position === "top" ? "topStyle" : "",
              this.position === "middle" ? "middleStyle" : "",
              this.position === "bottom" ? "bottomStyle" : "",
            ]}
            style={this.styleC}
          >
            {this.msg}
          </div>
        ) : null}
      </transition>
    );
  },
});
