import Vue from "vue";

export default Vue.extend({
  name: "mk-sudoku",

  data: () => ({
    component: "mk-sudoku"
  }),

  render() {
    return (
      <div>{this.component}</div>
    )
  }
})
