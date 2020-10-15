"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const lodash_1 = require("lodash");
const constant_1 = require("../common/constant");
const mini_css_extract_plugin_1 = __importDefault(require("mini-css-extract-plugin"));
const config = {
    mode: 'production',
    entry: lodash_1.join(constant_1.ES_DIR + 'index.js'),
    output: {
        filename: '[name].min.js'
    },
    module: {
        rules: [
            {
                test: /.(c|le)ss$/,
                use: [
                    {
                        loader: mini_css_extract_plugin_1.default.loader
                    },
                    'css-loader',
                    'postcss-loader',
                    'less-loader'
                ]
            }
        ]
    }
};
exports.default = config;
