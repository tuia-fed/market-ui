"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.compileSass = void 0;
const sass_1 = require("sass");
// allow to import from node_modules
// @import "~package-name/var.scss"
const tildeImporter = (url) => {
    if (url.includes('~')) {
        url = url.replace('~', '');
        if (!url.includes('.scss')) {
            url += '.scss';
        }
        url = require.resolve(url);
    }
    return { file: url };
};
async function compileSass(filePath) {
    const { css } = sass_1.renderSync({ file: filePath, importer: tildeImporter });
    return css;
}
exports.compileSass = compileSass;
