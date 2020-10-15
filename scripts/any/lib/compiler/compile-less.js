"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.compileLess = void 0;
const fs_extra_1 = require("fs-extra");
const less_1 = require("less");
// todo：支持less文件中的 @import 路径为绝对路径
async function compileLess(filepath) {
    const source = fs_extra_1.readFileSync(filepath, 'utf-8');
    const { css } = await less_1.render(source, {
        filename: filepath
    });
    return css;
}
exports.compileLess = compileLess;
