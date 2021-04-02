"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.compileJs = void 0;
const core_1 = require("@babel/core");
const fs_extra_1 = require("fs-extra");
const common_1 = require("../common");
const css_1 = require("../common/css");
const get_deps_1 = require("./get-deps");
function compileJs(filePath) {
    return new Promise((resolve, reject) => {
        let code = fs_extra_1.readFileSync(filePath, 'utf-8');
        code = css_1.replaceCssImportExt(code);
        code = get_deps_1.replaceScriptImportExt(code, '.vue', '');
        core_1.transformAsync(code, { filename: filePath })
            .then((result) => {
            if (result) {
                const jsFilePath = common_1.replaceExt(filePath, '.js');
                fs_extra_1.removeSync(filePath);
                fs_extra_1.outputFileSync(jsFilePath, result.code);
                resolve();
            }
        })
            .catch(reject);
    });
}
exports.compileJs = compileJs;
