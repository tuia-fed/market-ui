"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.compileJs = void 0;
const core_1 = require("@babel/core");
const fs_extra_1 = require("fs-extra");
const common_1 = require("../common");
const css_1 = require("../common/css");
async function compileJs(filepath) {
    return new Promise((resolve, reject) => {
        let code = fs_extra_1.readFileSync(filepath, 'utf-8');
        code = css_1.replaceCssImport(code);
        core_1.transformAsync(code, {
            filename: filepath,
            // todo 临时方案
            cwd: process.cwd() + '/scripts/any'
        })
            .then(result => {
            if (result) {
                // 输出为js文件
                const jsFilePath = common_1.replaceExt(filepath, '.js');
                // 移除原文件
                fs_extra_1.removeSync(filepath);
                // 输出
                fs_extra_1.outputFileSync(jsFilePath, result.code);
                resolve();
            }
        })
            .catch(reject);
    });
}
exports.compileJs = compileJs;
