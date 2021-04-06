<template>
  <div :style="circleStyle" class="mk-wheel">
    <slot />
  </div>
</template>

<script>
export default {
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
    circleStyle() {
      return {
        transform: `rotate3d(0, 0, 1, ${this.angle}deg)`,
        width: this.size + "px",
        height: this.size + "px",
      };
    },
  },
};
</script>
