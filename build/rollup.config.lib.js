const base = require("./rollup.config.base");

/**
 * @type {import('rollup').RollupOptions}
 */
module.exports = {
  input: "src/index.js",
  output: {
    file: "lib/mkui.umd.js",
    format: "umd",
    name: "mkui",
  },
  ...base,
};
