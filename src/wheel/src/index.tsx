import Vue from "vue";

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
    wheelStyle(): object  {
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
