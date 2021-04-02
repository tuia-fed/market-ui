import vuePlugin from "rollup-plugin-vue";
import { nodeResolve } from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import css from "rollup-plugin-css-only";
import fs from "fs";
import glob from "glob";

const NameReg = /src\/(.+)\/index.js/;

function getEntries(dir) {
  const entries = {};
  glob.sync(`${dir}/*/index.js`).reduce((res, item) => {
    res[NameReg.exec(item)[1] + "/index"] = item;
    return res;
  }, entries);
  return entries;
}

/**
 * @type {import('rollup').RollupOptions}
 */
module.exports = {
  input: getEntries("src"),
  output: {
    dir: "lib",
    format: "es",
  },
  plugins: [
    nodeResolve(),
    commonjs(),
    vuePlugin({
      css: false,
      normalizer: "~rollup-plugin-vue/runtime/normalize",
    }),
    css({
      output(_, b) {
        if (!fs.existsSync("lib")) {
          fs.mkdirSync("lib");
        }
        Object.keys(b)
          .map((path) => {
            return {
              name: /[A-Za-z/]+\/src\/([A-Za-z]+)\/src[A-Za-z/]+/.exec(path)[1],
              key: path,
            };
          })
          .forEach(({ name, key }) => {
            let result = b[key];

            if (!fs.existsSync(`lib/${name}`)) {
              fs.mkdirSync(`lib/${name}`);
            }
            if (!fs.existsSync(`lib/${name}/style`)) {
              fs.mkdirSync(`lib/${name}/style`);
            }
            if (!fs.existsSync(`lib/${name}/style/css.js`)) {
              fs.writeFileSync(
                `lib/${name}/style/css.js`,
                `import "./index.css";`
              );
            }
            if (fs.existsSync(`lib/${name}/style/index.css`)) {
              result = fs.readFileSync(`lib/${name}/style/index.css`) + b[key];
            }
            fs.writeFileSync(`lib/${name}/style/index.css`, result);
          });
      },
    }),
  ],
};
