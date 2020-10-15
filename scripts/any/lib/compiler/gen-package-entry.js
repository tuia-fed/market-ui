"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.genPackageEntry = void 0;
const fs_extra_1 = require("fs-extra");
const path_1 = require("path");
const common_1 = require("../common");
const constant_1 = require("../common/constant");
function genImport(component) {
    return `import ${common_1.pascalize(component)} from "./${path_1.relative(constant_1.SRC_DIR, path_1.join(constant_1.SRC_DIR, component))}"`;
}
function genImports(components) {
    let content = '';
    components.forEach(component => {
        content += genImport(component);
        content += '\n';
    });
    return content;
}
function genPackageEntry({ output }) {
    const components = common_1.getComponents();
    const pkg = constant_1.getPackageJson();
    const names = components.map(common_1.pascalize);
    const version = pkg.version;
    let content = '';
    // 构造入口文件内容
    content += `
${genImports(components)}

const version = "${version}"

function install(app) {
  const components = [
  ${names.join(',\n  ')}
  ]
  
  components.forEach(component => {
    if (component.install) {
      app.use(component)
    } else if (component.name) {
      app.component(component.name, component)
    }
  })
}

export {
  version,
  install,
  ${names.join(',\n  ')}
}

export default {
  version,
  install
}
`;
    fs_extra_1.outputFileSync(output, content);
}
exports.genPackageEntry = genPackageEntry;
