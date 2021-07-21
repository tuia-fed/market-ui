import Vue from "vue";

export default Vue.extend({
  name: "mk-turn-card",

  data: () => ({
    component: "mk-turn-card"
  }),

  render() {
    return (
      <div>{this.component}</div>
    )
  }
})
