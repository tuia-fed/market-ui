"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.replaceScriptImportExt = exports.getDeps = exports.clearDepsCache = exports.fillExt = void 0;
const path_1 = require("path");
const constant_1 = require("../common/constant");
const fs_extra_1 = require("fs-extra");
let depsMap = {};
let existsCache = {};
// https://regexr.com/47jlq
const IMPORT_RE = /import\s+?(?:(?:(?:[\w*\s{},]*)\s+from(\s+)?)|)(?:(?:".*?")|(?:'.*?'))[\s]*?(?:;|$|)/g;
function matchImports(code) {
    return code.match(IMPORT_RE) || [];
}
function exists(filePath) {
    if (!(filePath in existsCache)) {
        existsCache[filePath] = fs_extra_1.existsSync(filePath);
    }
    return existsCache[filePath];
}
function fillExt(filePath) {
    for (let i = 0; i < constant_1.SCRIPT_EXTS.length; i++) {
        const completePath = `${filePath}${constant_1.SCRIPT_EXTS[i]}`;
        if (exists(completePath)) {
            return completePath;
        }
    }
    for (let i = 0; i < constant_1.SCRIPT_EXTS.length; i++) {
        const completePath = `${filePath}/index${constant_1.SCRIPT_EXTS[i]}`;
        if (exists(completePath)) {
            return completePath;
        }
    }
    return '';
}
exports.fillExt = fillExt;
function getPathByImport(code, filePath) {
    const divider = code.includes('"') ? '"' : "'";
    const relativePath = code.split(divider)[1];
    if (relativePath.includes('.')) {
        return fillExt(path_1.join(filePath, '..', relativePath));
    }
    return null;
}
function clearDepsCache() {
    depsMap = {};
    existsCache = {};
}
exports.clearDepsCache = clearDepsCache;
function getDeps(filePath) {
    if (depsMap[filePath]) {
        return depsMap[filePath];
    }
    const code = fs_extra_1.readFileSync(filePath, 'utf-8');
    const imports = matchImports(code);
    const paths = imports
        .map(item => getPathByImport(item, filePath))
        .filter(item => !!item);
    depsMap[filePath] = paths;
    paths.forEach(getDeps);
    return paths;
}
exports.getDeps = getDeps;
// "import App from 'App.vue';" => "import App from 'App.xxx';"
function replaceScriptImportExt(code, from, to) {
    const importLines = matchImports(code);
    importLines.forEach(importLine => {
        const result = importLine.replace(from, to);
        code = code.replace(importLine, result);
    });
    return code;
}
exports.replaceScriptImportExt = replaceScriptImportExt;
