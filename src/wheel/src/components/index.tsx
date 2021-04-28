import Vue from "vue";

export default Vue.extend({
  name: "mk-wheel-option",

  props: {
    title: String,
    image: String,
    index: {
      type: Number,
      required: true,
    },
  },

  computed: {
    optionStyle(): object {
      return {
        transform: `rotate(${15 + this.index * 60}deg) skew(15deg, 15deg)`,
      };
    },
  },

  render() {
    return (
      <div
        onClick={this.onClick}
        style={this.optionStyle}
        class="mk-wheel_option"
      >
        <div class="mk-wheel_option__revert">
          <div class="mk-wheel_option__title">{this.title}</div>
          <img
            v-if={this.image}
            class="mk-wheel_option__image"
            src={this.image}
            alt={this.title}
          />
        </div>
      </div>
    );
  },

  methods: {
    onClick(e: Event) {
      this.$emit("click", e, this.index);
    },
  },
});
