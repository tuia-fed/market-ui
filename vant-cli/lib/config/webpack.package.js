"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPackageConfig = void 0;
const webpack_merge_1 = require("webpack-merge");
const path_1 = require("path");
const webpack_base_1 = require("./webpack.base");
const common_1 = require("../common");
const constant_1 = require("../common/constant");
function getPackageConfig(isMinify) {
    const { name } = common_1.getVantConfig();
    common_1.setBuildTarget('package');
    return common_1.getWebpackConfig(webpack_merge_1.merge(webpack_base_1.baseConfig, {
        mode: 'production',
        entry: {
            [name]: path_1.join(constant_1.ES_DIR, 'index.js'),
        },
        stats: 'none',
        output: {
            path: constant_1.LIB_DIR,
            library: name,
            libraryTarget: 'umd',
            filename: isMinify ? '[name].min.js' : '[name].js',
            umdNamedDefine: true,
            // https://github.com/webpack/webpack/issues/6522
            globalObject: "typeof self !== 'undefined' ? self : this",
        },
        externals: {
            vue: {
                root: 'Vue',
                commonjs: 'vue',
                commonjs2: 'vue',
                amd: 'vue',
            },
        },
        performance: false,
        optimization: {
            minimize: isMinify,
        },
    }));
}
exports.getPackageConfig = getPackageConfig;
