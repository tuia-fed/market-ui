const vuePlugin = require("rollup-plugin-vue");
const { nodeResolve } = require("@rollup/plugin-node-resolve");
const commonjs = require("@rollup/plugin-commonjs");

/**
 * @type {import('rollup').RollupOptions}
 */
module.exports = {
  plugins: [
    nodeResolve(),
    commonjs(),
    vuePlugin({
      normalizer: "~rollup-plugin-vue/runtime/normalize",
    }),
  ],
};
