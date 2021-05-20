import Vue, { VNode } from "vue";

type StyleObject = {
  transform: string;
};

export default Vue.extend({
  name: "mk-wheel-option",

  props: {
    index: {
      type: Number,
      default: 0,
    },
    title: {
      type: String,
      default: ''
    },
    image: {
      type: String,
      default: ''
    }
  },

  computed: {
    optionStyle(): StyleObject {
      return {
        transform: `rotate(${15 + this.index * 60}deg) skew(15deg, 15deg)`
      };
    }
  },

  render(): VNode {
    return (
      <div onClick={this.onClick} style={this.optionStyle} class="mk-wheel-option">
        <div class="mk-wheel-option__revert">
          {
            this.title && <div class="mk-wheel-option__title">{this.title}</div>
          }
          {
            this.image && <img
              class="mk-wheel-option__image"
              src={this.image}
              alt={this.title}
            />
          }
          {this.$slots.default}
        </div>
      </div>
    );
  },

  methods: {
    onClick() {
      this.$emit('click', this.index)
    }
  }
});
