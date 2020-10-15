"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPackageConfig = void 0;
const path_1 = require("path");
const constant_1 = require("../common/constant");
const mini_css_extract_plugin_1 = __importDefault(require("mini-css-extract-plugin"));
const css_minimizer_webpack_plugin_1 = __importDefault(require("css-minimizer-webpack-plugin"));
const terser_webpack_plugin_1 = __importDefault(require("terser-webpack-plugin"));
function getPackageConfig(isMinify) {
    const { name } = constant_1.getConfig();
    return {
        mode: 'production',
        entry: {
            [name]: path_1.join(constant_1.ES_DIR, 'index.js')
        },
        output: {
            path: constant_1.LIB_DIR,
            library: name,
            libraryTarget: 'umd',
            filename: '[name].min.js'
        },
        externals: {
            vue: {
                root: 'Vue',
                commonjs: 'vue',
                commonjs2: 'vue',
                amd: 'vue'
            }
        },
        module: {
            rules: [
                {
                    test: /.(c|le)ss$/,
                    use: [
                        {
                            loader: mini_css_extract_plugin_1.default.loader,
                            options: {
                                esModule: false
                            }
                        },
                        'css-loader',
                        {
                            loader: 'postcss-loader',
                            options: {
                                postcssOptions: {
                                    config: path_1.join(constant_1.CONFIG_DIR, 'postcss.config.js')
                                }
                            }
                        }
                    ]
                }
            ]
        },
        optimization: {
            minimize: isMinify,
            /**@ts-ignore */
            minimizer: [new terser_webpack_plugin_1.default(), new css_minimizer_webpack_plugin_1.default()]
        },
        plugins: [
            /**@ts-ignore */
            new mini_css_extract_plugin_1.default({
                filename: '[name].min.css'
            })
        ]
    };
}
exports.getPackageConfig = getPackageConfig;
