"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRootPostcssConfig = void 0;
const fs_extra_1 = require("fs-extra");
const constant_1 = require("../common/constant");
function getRootPostcssConfig() {
    if (fs_extra_1.existsSync(constant_1.ROOT_POSTCSS_CONFIG_FILE)) {
        return require(constant_1.ROOT_POSTCSS_CONFIG_FILE);
    }
    return { plugins: [] };
}
exports.getRootPostcssConfig = getRootPostcssConfig;
function getPostcssPlugins(rootConfig) {
    const plugins = rootConfig.plugins || [];
    if (Array.isArray(plugins)) {
        return [require('autoprefixer'), ...plugins];
    }
    return Object.assign({ autoprefixer: {} }, plugins);
}
function resolvePostcssConfig() {
    const rootConfig = getRootPostcssConfig();
    return Object.assign(Object.assign({}, rootConfig), { plugins: getPostcssPlugins(rootConfig) });
}
module.exports = resolvePostcssConfig();
