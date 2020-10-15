"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.compileSfc = void 0;
const compiler = __importStar(require("@vue/compiler-sfc"));
const compileDom = __importStar(require("@vue/compiler-dom"));
const fs_extra_1 = require("fs-extra");
const constant_1 = require("../common/constant");
const common_1 = require("../common");
function genComponentOptions(script) {
    return script.replace(/[\s]/, '');
}
function injectRender(script, render) {
    return script;
}
// todo: 支持sfc的组件编译
function compileSfc(filepath) {
    // 源码
    const source = fs_extra_1.readFileSync(filepath, 'utf-8');
    // 编译任务队列
    const task = [fs_extra_1.remove(filepath)];
    // 解析源码
    const { descriptor } = compiler.parse(source, {
        filename: filepath,
        sourceRoot: constant_1.SRC_DIR
    });
    // 拿到物料
    const { template, script, styles } = descriptor;
    //样式 是否使用了 Scoped
    const hasScoped = descriptor.styles.some(s => s.scoped);
    // compile js
    if (script) {
        task.push(new Promise((resolve, reject) => {
            // 脚本内容
            let content = script.content;
            if (template) {
                const render = compileDom.compile(template?.content);
                content = injectRender(content, render.code);
                fs_extra_1.outputFileSync(common_1.replaceExt(filepath, '.json'), JSON.stringify(descriptor, null, 2));
                resolve();
            }
        }));
    }
    return Promise.all(task);
}
exports.compileSfc = compileSfc;
