const glob = require("glob");
const fs = require("fs");

const ignoreDirs = ["styles"];

function getComponents(dir) {
  const comps = {};
  const NameReg = new RegExp(`${dir}/(.+)/index.js`);
  glob.sync(`${dir}/*/index.js`).reduce((res, item) => {
    let name = NameReg.exec(item)[1];
    if (!ignoreDirs.includes(name)) {
      res[name] = item;
    }
    return res;
  }, comps);
  return comps;
}

function genCssFile(dir) {
  const comps = getComponents(dir);
  Object.keys(comps).forEach((key) => {
    fs.writeFileSync(
      comps[key].replace("index.js", "style/css.js"),
      `import "./index.css";\n`
    );
    fs.writeFileSync(
      comps[key].replace("index.js", "style/index.js"),
      `import "./index.less";\n`
    );
  });
}

function getEntries(dir) {
  const entries = {};
  const comps = getComponents(dir);
  Object.keys(comps).reduce((res, key) => {
    res[key + "/index"] = comps[key];
    return res;
  }, entries);
  return entries;
}

module.exports = {
  getEntries,
  genCssFile,
};
