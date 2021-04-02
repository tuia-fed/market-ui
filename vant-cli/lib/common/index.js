"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getVantConfig = exports.smartOutputFile = exports.isDev = exports.setBuildTarget = exports.setNodeEnv = exports.setModuleEnv = exports.getWebpackConfig = exports.normalizePath = exports.decamelize = exports.pascalize = exports.camelize = exports.isScript = exports.isStyle = exports.isSfc = exports.isTestDir = exports.isDemoDir = exports.isDir = exports.getComponents = exports.hasDefaultExport = exports.replaceExt = exports.removeExt = exports.ENTRY_EXTS = exports.SCRIPT_REGEXP = exports.STYLE_REGEXP = exports.TEST_REGEXP = exports.DEMO_REGEXP = exports.SFC_REGEXP = exports.EXT_REGEXP = void 0;
const path_1 = require("path");
const fs_extra_1 = require("fs-extra");
const webpack_merge_1 = require("webpack-merge");
const constant_1 = require("./constant");
Object.defineProperty(exports, "getVantConfig", { enumerable: true, get: function () { return constant_1.getVantConfig; } });
exports.EXT_REGEXP = /\.\w+$/;
exports.SFC_REGEXP = /\.(vue)$/;
exports.DEMO_REGEXP = new RegExp('\\' + path_1.sep + 'demo$');
exports.TEST_REGEXP = new RegExp('\\' + path_1.sep + 'test$');
exports.STYLE_REGEXP = /\.(css|less|scss)$/;
exports.SCRIPT_REGEXP = /\.(js|ts|jsx|tsx)$/;
exports.ENTRY_EXTS = ['js', 'ts', 'tsx', 'jsx', 'vue'];
function removeExt(path) {
    return path.replace('.js', '');
}
exports.removeExt = removeExt;
function replaceExt(path, ext) {
    return path.replace(exports.EXT_REGEXP, ext);
}
exports.replaceExt = replaceExt;
function hasDefaultExport(code) {
    return code.includes('export default') || code.includes('export { default }');
}
exports.hasDefaultExport = hasDefaultExport;
function getComponents() {
    const EXCLUDES = ['.DS_Store'];
    const dirs = fs_extra_1.readdirSync(constant_1.SRC_DIR);
    return dirs
        .filter((dir) => !EXCLUDES.includes(dir))
        .filter((dir) => exports.ENTRY_EXTS.some((ext) => {
        const path = path_1.join(constant_1.SRC_DIR, dir, `index.${ext}`);
        if (fs_extra_1.existsSync(path)) {
            return hasDefaultExport(fs_extra_1.readFileSync(path, 'utf-8'));
        }
        return false;
    }));
}
exports.getComponents = getComponents;
function isDir(dir) {
    return fs_extra_1.lstatSync(dir).isDirectory();
}
exports.isDir = isDir;
function isDemoDir(dir) {
    return exports.DEMO_REGEXP.test(dir);
}
exports.isDemoDir = isDemoDir;
function isTestDir(dir) {
    return exports.TEST_REGEXP.test(dir);
}
exports.isTestDir = isTestDir;
function isSfc(path) {
    return exports.SFC_REGEXP.test(path);
}
exports.isSfc = isSfc;
function isStyle(path) {
    return exports.STYLE_REGEXP.test(path);
}
exports.isStyle = isStyle;
function isScript(path) {
    return exports.SCRIPT_REGEXP.test(path);
}
exports.isScript = isScript;
const camelizeRE = /-(\w)/g;
const pascalizeRE = /(\w)(\w*)/g;
function camelize(str) {
    return str.replace(camelizeRE, (_, c) => c.toUpperCase());
}
exports.camelize = camelize;
function pascalize(str) {
    return camelize(str).replace(pascalizeRE, (_, c1, c2) => c1.toUpperCase() + c2);
}
exports.pascalize = pascalize;
function decamelize(str, sep = '-') {
    return str
        .replace(/([a-z\d])([A-Z])/g, '$1' + sep + '$2')
        .replace(/([A-Z]+)([A-Z][a-z\d]+)/g, '$1' + sep + '$2')
        .toLowerCase();
}
exports.decamelize = decamelize;
function normalizePath(path) {
    return path.replace(/\\/g, '/');
}
exports.normalizePath = normalizePath;
function getWebpackConfig(defaultConfig) {
    if (fs_extra_1.existsSync(constant_1.ROOT_WEBPACK_CONFIG_FILE)) {
        const config = require(constant_1.ROOT_WEBPACK_CONFIG_FILE);
        // 如果是函数形式，可能并不仅仅是添加额外的处理流程，而是在原有流程上进行修改
        // 比如修改markdown-loader,添加options.enableMetaData
        if (typeof config === 'function') {
            return webpack_merge_1.merge(defaultConfig, config(defaultConfig));
        }
        return webpack_merge_1.merge(defaultConfig, config);
    }
    return defaultConfig;
}
exports.getWebpackConfig = getWebpackConfig;
function setModuleEnv(value) {
    process.env.BABEL_MODULE = value;
}
exports.setModuleEnv = setModuleEnv;
function setNodeEnv(value) {
    process.env.NODE_ENV = value;
}
exports.setNodeEnv = setNodeEnv;
function setBuildTarget(value) {
    process.env.BUILD_TARGET = value;
}
exports.setBuildTarget = setBuildTarget;
function isDev() {
    return process.env.NODE_ENV === 'development';
}
exports.isDev = isDev;
// smarter outputFileSync
// skip output if file content unchanged
function smartOutputFile(filePath, content) {
    if (fs_extra_1.existsSync(filePath)) {
        const previousContent = fs_extra_1.readFileSync(filePath, 'utf-8');
        if (previousContent === content) {
            return;
        }
    }
    fs_extra_1.outputFileSync(filePath, content);
}
exports.smartOutputFile = smartOutputFile;
