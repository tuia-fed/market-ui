import Vue from "vue";

type styleObject = {
  transform: string,
  width: string,
  height: string
}

export default Vue.extend({
  name: "mk-wheel",

  props: {
    angle: {
      type: Number,
      default: 0,
    },
    size: {
      type: Number,
      default: 300,
    },
  },

  computed: {
    wheelStyle(): styleObject  {
      return {
        transform: `rotate3d(0, 0, 1, ${this.angle}deg)`,
        width: this.size + "px",
        height: this.size + "px",
      }
    }
  },

  render() {
    return (
      <div style={this.wheelStyle} class="mk-wheel">
        <slot />
      </div>
    );
  }
});
