"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.compileCss = exports.getPostcssConfig = void 0;
const postcss_load_config_1 = __importDefault(require("postcss-load-config"));
const postcss_1 = __importDefault(require("postcss"));
const clean_css_1 = __importDefault(require("clean-css"));
const constant_1 = require("../common/constant");
function getPostcssConfig() {
    return postcss_load_config_1.default.sync({}, constant_1.POSTCSS_CONFIG_FILE);
}
exports.getPostcssConfig = getPostcssConfig;
async function compileCss(source) {
    const config = getPostcssConfig();
    const { css } = await postcss_1.default(config.plugins).process(source, {
        from: undefined
    });
    return new clean_css_1.default().minify(css).styles;
}
exports.compileCss = compileCss;
