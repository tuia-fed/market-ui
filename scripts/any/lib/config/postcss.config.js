"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const css_1 = require("../common/css");
function mergePostcssConfig(config1, config2) {
    const plugins = {
        ...config1.plugins,
        ...config2.plugins
    };
    return {
        ...config1,
        ...config2,
        plugins
    };
}
const DEFAULT_CONFIG = {
    plugins: {
        autoprefixer: {}
    }
};
module.exports = mergePostcssConfig(DEFAULT_CONFIG, css_1.getPostcssConfig());
