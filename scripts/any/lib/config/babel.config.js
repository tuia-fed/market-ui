"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("../common");
module.exports = function (api) {
    if (api) {
        // Do not cache this config, and re-execute the function every time.
        api.cache.never();
    }
    const { MODULE_ENV } = process.env;
    const useESModules = MODULE_ENV !== 'commonjs';
    const config = {
        presets: [
            [
                '@babel/preset-env',
                {
                    loose: true,
                    modules: useESModules ? false : 'commonjs'
                }
            ],
            '@babel/preset-typescript'
        ],
        plugins: [
            [
                '@babel/plugin-transform-runtime',
                {
                    corejs: false,
                    useESModules
                }
            ],
            '@babel/plugin-transform-object-assign'
        ]
    };
    if (common_1.isVue) {
        config.plugins.push('@vue/babel-plugin-jsx');
    }
    return config;
};
