"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.baseConfig = void 0;
const sass_1 = __importDefault(require("sass"));
const webpack_1 = __importDefault(require("webpack"));
const friendly_errors_webpack_plugin_1 = __importDefault(require("@nuxt/friendly-errors-webpack-plugin"));
const vue_loader_1 = require("vue-loader");
const path_1 = require("path");
const logger_1 = require("../common/logger");
const fs_1 = require("fs");
const constant_1 = require("../common/constant");
const CSS_LOADERS = [
    'style-loader',
    'css-loader',
    {
        loader: 'postcss-loader',
        options: {
            postcssOptions: require(constant_1.POSTCSS_CONFIG_FILE),
        },
    },
];
const plugins = [
    new webpack_1.default.DefinePlugin({
        __VUE_OPTIONS_API__: 'true',
        __VUE_PROD_DEVTOOLS__: 'false',
    }),
    new vue_loader_1.VueLoaderPlugin(),
    new friendly_errors_webpack_plugin_1.default({
        clearConsole: false,
        logLevel: 'WARNING',
    }),
];
const tsconfigPath = path_1.join(constant_1.CWD, 'tsconfig.json');
if (fs_1.existsSync(tsconfigPath)) {
    const ForkTsCheckerPlugin = require('fork-ts-checker-webpack-plugin');
    plugins.push(new ForkTsCheckerPlugin({
        typescript: {
            extensions: {
                vue: {
                    enabled: true,
                    compiler: '@vue/compiler-sfc',
                },
            },
        },
        logger: {
            issues: {
                // skip info message
                log() { },
                warn(message) {
                    logger_1.consola.warn(message);
                },
                error(message) {
                    logger_1.consola.error(message);
                },
            },
        },
    }));
}
exports.baseConfig = {
    mode: 'development',
    resolve: {
        extensions: [...constant_1.SCRIPT_EXTS, ...constant_1.STYLE_EXTS],
    },
    module: {
        rules: [
            {
                test: /\.vue$/,
                use: [
                    {
                        loader: 'vue-loader',
                        options: {
                            compilerOptions: {
                                preserveWhitespace: false,
                            },
                        },
                    },
                ],
            },
            {
                test: /\.(js|ts|jsx|tsx)$/,
                exclude: /node_modules\/(?!(@vant\/cli))/,
                use: ['babel-loader'],
            },
            {
                test: /\.css$/,
                sideEffects: true,
                use: CSS_LOADERS,
            },
            {
                test: /\.less$/,
                sideEffects: true,
                use: [...CSS_LOADERS, 'less-loader'],
            },
            {
                test: /\.scss$/,
                sideEffects: true,
                use: [
                    ...CSS_LOADERS,
                    {
                        loader: 'sass-loader',
                        options: {
                            implementation: sass_1.default,
                        },
                    },
                ],
            },
            {
                test: /\.md$/,
                use: ['@vant/markdown-loader'],
            },
        ],
    },
    plugins,
    cache: {
        type: 'filesystem',
        buildDependencies: {
            config: [__filename],
        },
    },
};
