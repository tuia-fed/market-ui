import Vue from "vue";

export default Vue.extend({
  name: "mk-{{classname}}",

  data: () => ({
    component: "mk-{{classname}}"
  }),

  render() {
    return (
      <div>{this.component}</div>
    )
  }
})
