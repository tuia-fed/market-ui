"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isReact = exports.isVue = exports.isSfc = exports.isStyle = exports.isScript = exports.isDir = exports.SFC_REGEXP = exports.STYLE_REGEXP = exports.SCRIPT_REGEXP = void 0;
const fs_extra_1 = require("fs-extra");
const constant_1 = require("./constant");
exports.SCRIPT_REGEXP = /\.(js|ts|jsx|tsx)$/;
exports.STYLE_REGEXP = /\.(css|less)$/;
exports.SFC_REGEXP = /\.(vue)$/;
// 是否为文件夹
function isDir(dir) {
    return fs_extra_1.lstatSync(dir).isDirectory();
}
exports.isDir = isDir;
// 是否为脚本文件
function isScript(path) {
    return exports.SCRIPT_REGEXP.test(path);
}
exports.isScript = isScript;
// 是否为样式文件
function isStyle(path) {
    return exports.STYLE_REGEXP.test(path);
}
exports.isStyle = isStyle;
// 是否为vue单文件组件
function isSfc(path) {
    return exports.SFC_REGEXP.test(path);
}
exports.isSfc = isSfc;
// 是否使用vue框架
exports.isVue = constant_1.FRAMEWORk === 'vue';
// 是否使用react框架
exports.isReact = constant_1.FRAMEWORk === 'react';
