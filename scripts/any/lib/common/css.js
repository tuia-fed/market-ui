"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.replaceCssImport = exports.isLess = exports.getPostcssConfig = exports.isComponentCssExisted = exports.getCssBaseFile = exports.STYLE_LESS_EXT = void 0;
const fs_extra_1 = require("fs-extra");
const lodash_1 = require("lodash");
const path_1 = require("path");
const constant_1 = require("./constant");
exports.STYLE_LESS_EXT = '.less';
// 获取基础样式文件
function getCssBaseFile() {
    const config = constant_1.getConfig();
    // 默认路径
    let path = path_1.join(constant_1.STYLE_DIR, `index.${constant_1.CSS_LANG}`);
    // 如果用户有配置
    const baseFile = lodash_1.get(config, 'build.css.base');
    if (baseFile) {
        path = path_1.isAbsolute(baseFile) ? baseFile : path_1.join(constant_1.SRC_DIR, baseFile);
    }
    // 文件存在
    if (fs_extra_1.existsSync(path)) {
        return path;
    }
    return '';
}
exports.getCssBaseFile = getCssBaseFile;
// 判断组件的样式文件是否存在
function isComponentCssExisted(component) {
    return fs_extra_1.existsSync(path_1.join(constant_1.SRC_DIR, `${component}/index.${constant_1.CSS_LANG}`));
}
exports.isComponentCssExisted = isComponentCssExisted;
// 获取postcss的配置
function getPostcssConfig() {
    if (fs_extra_1.existsSync(constant_1.ROOT_POSTCSS_CONFIG_FILE)) {
        return require(constant_1.ROOT_POSTCSS_CONFIG_FILE);
    }
    return {};
}
exports.getPostcssConfig = getPostcssConfig;
// 判断文件是不是less
function isLess(filepath) {
    const parsePath = path_1.parse(filepath);
    return parsePath.ext === exports.STYLE_LESS_EXT;
}
exports.isLess = isLess;
const IMPORT_STYLE_RE = /import\s+?(?:(?:".*?")|(?:'.*?'))[\s]*?(?:;|$|)/g;
// "import 'a.less';" => "import 'a.css';"
function replaceCssImport(code) {
    return code.replace(IMPORT_STYLE_RE, str => str.replace(`.${constant_1.CSS_LANG}`, '.css'));
}
exports.replaceCssImport = replaceCssImport;
