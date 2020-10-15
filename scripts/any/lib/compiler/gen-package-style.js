"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.genPackageStyle = void 0;
const fs_extra_1 = require("fs-extra");
const path_1 = require("path");
const common_1 = require("../common");
const constant_1 = require("../common/constant");
const css_1 = require("../common/css");
function template(name) {
    return `@import "./${name}";`;
}
function genPackageStyle({ output }) {
    const components = common_1.getComponents();
    // 组件是否有基础样式文件
    const basefile = css_1.getCssBaseFile();
    let content = '';
    // 引入公共样式
    if (basefile) {
        content += template(path_1.relative(constant_1.SRC_DIR, basefile));
        content += '\n';
    }
    content += components
        .map(component => {
        if (!css_1.isComponentCssExisted(component)) {
            return '';
        }
        return template(path_1.relative(constant_1.SRC_DIR, path_1.join(constant_1.SRC_DIR, `${component}/index.${constant_1.CSS_LANG}`)));
    })
        .filter(item => !!item)
        .join('\n');
    fs_extra_1.outputFileSync(output, content);
}
exports.genPackageStyle = genPackageStyle;
