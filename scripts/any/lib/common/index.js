"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.pascalize = exports.camelize = exports.getComponents = exports.replaceExt = exports.EXT_REGEXP = exports.hasYarn = exports.setModuleEnv = exports.setNodeEnv = void 0;
const child_process_1 = require("child_process");
const fs_extra_1 = require("fs-extra");
const path_1 = require("path");
const constant_1 = require("./constant");
__exportStar(require("./is"), exports);
// 设置环境变量
function setNodeEnv(value) {
    process.env.NODE_ENV = value;
}
exports.setNodeEnv = setNodeEnv;
function setModuleEnv(value) {
    process.env.MODULE_ENV = value;
}
exports.setModuleEnv = setModuleEnv;
let hasYarnCache;
// 判断用户是否安装了yarn
function hasYarn() {
    if (hasYarnCache === undefined) {
        try {
            child_process_1.execSync('yarn --version', { stdio: 'ignore' });
            hasYarnCache = true;
        }
        catch (e) {
            hasYarnCache = false;
        }
    }
    return hasYarnCache;
}
exports.hasYarn = hasYarn;
exports.EXT_REGEXP = /\.\w+$/;
// 替换文件后缀名
function replaceExt(path, ext) {
    return path.replace(exports.EXT_REGEXP, ext);
}
exports.replaceExt = replaceExt;
// 获取所有组件
function getComponents() {
    const excludes = ['.DS_Store'];
    const dirs = fs_extra_1.readdirSync(constant_1.SRC_DIR);
    return dirs
        .filter(dir => !excludes.includes(dir))
        .filter(dir => {
        return constant_1.ENTRY_EXTS.some(ext => {
            const path = path_1.join(constant_1.SRC_DIR, dir, `index${ext}`);
            if (fs_extra_1.existsSync(path)) {
                return true;
            }
            return false;
        });
    });
}
exports.getComponents = getComponents;
const camelizeRE = /-(\w)/g;
const pascalizeRE = /(\w)(\w*)/g;
// '-a' => 'A'
function camelize(str) {
    return str.replace(camelizeRE, (_, c) => c.toUpperCase());
}
exports.camelize = camelize;
// 'a-bcc' => 'ABcc' 'abc-def' => 'AbcDef'
function pascalize(str) {
    return camelize(str).replace(pascalizeRE, (_, c1, c2) => c1.toUpperCase() + c2);
}
exports.pascalize = pascalize;
