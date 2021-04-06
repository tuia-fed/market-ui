<template>
  <div @Click="onClick" :style="optionStyle" class="mk-wheel_option">
    <div class="mk-wheel_option__revert">
      <div class="mk-wheel_option__title">{{ title }}</div>
      <img
        v-if="image"
        class="mk-wheel_option__image"
        :src="image"
        :alt="title"
      />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: String,
    image: String,
    index: {
      type: Number,
      required: true,
    },
  },

  computed: {
    optionStyle() {
      return {
        transform: `rotate(${15 + this.index * 60}deg) skew(15deg, 15deg)`,
      };
    },
  },

  methods: {
    onClick(e) {
      this.$emit("click", e.this.index);
    },
  },
};
</script>
