"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.compileStyle = void 0;
const fs_extra_1 = require("fs-extra");
const path_1 = require("path");
const common_1 = require("../common");
const logger_1 = require("../common/logger");
const compile_css_1 = require("./compile-css");
const compile_less_1 = require("./compile-less");
async function compileFile(filepath) {
    const res = path_1.parse(filepath);
    try {
        // 如果是less
        if (res.ext === '.less') {
            const source = await compile_less_1.compileLess(filepath);
            return await compile_css_1.compileCss(source);
        }
        // 其他情况都看作css
        const source = fs_extra_1.readFileSync(filepath, 'utf-8');
        return await compile_css_1.compileCss(source);
    }
    catch (error) {
        logger_1.consola.error('Compile style failed: ' + filepath);
        throw error;
    }
}
// 编译样式文件
async function compileStyle(filepath) {
    const css = await compileFile(filepath);
    fs_extra_1.outputFileSync(common_1.replaceExt(filepath, '.css'), css);
}
exports.compileStyle = compileStyle;
