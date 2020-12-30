"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.genPackageEntry = void 0;
const lodash_1 = require("lodash");
const path_1 = require("path");
const common_1 = require("../common");
const constant_1 = require("../common/constant");
function genImports(components, options) {
    return components
        .map((name) => {
        let path = path_1.join(constant_1.SRC_DIR, name);
        if (options.pathResolver) {
            path = options.pathResolver(path);
        }
        return `import ${common_1.pascalize(name)} from '${common_1.normalizePath(path)}';`;
    })
        .join('\n');
}
function genExports(names) {
    return names.map((name) => `${name}`).join(',\n  ');
}
function genPackageEntry(options) {
    const names = common_1.getComponents();
    const vantConfig = constant_1.getVantConfig();
    const skipInstall = lodash_1.get(vantConfig, 'build.skipInstall', []).map(common_1.pascalize);
    const version = process.env.PACKAGE_VERSION || constant_1.getPackageJson().version;
    const components = names.map(common_1.pascalize);
    const content = `${genImports(names, options)}

const version = '${version}';

function install(app) {
  const components = [
    ${components.filter((item) => !skipInstall.includes(item)).join(',\n    ')}
  ];

  components.forEach(item => {
    if (item.install) {
      app.use(item);
    } else if (item.name) {
      app.component(item.name, item);
    }
  });
}

export {
  install,
  version,
  ${genExports(components)}
};

export default {
  install,
  version
};
`;
    common_1.smartOutputFile(options.outputPath, content);
}
exports.genPackageEntry = genPackageEntry;
