const base = require("./rollup.config.base");
const { getEntries } = require("./utils");

/**
 * @type {import('rollup').RollupOptions}
 */
module.exports = {
  input: getEntries("src"),
  output: {
    dir: "lib",
    format: "es",
  },
  ...base,
};
