"use strict";
/**
 * @babel/preset-typescript 不支持编译 Vue 文件中的 ts 代码
 * 通过手动添加 @babel/plugin-transform-typescript 的方式来解决这个问题
 * see: https://github.com/babel/babel-loader/pull/738
 */
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("fs");
const helper_plugin_utils_1 = require("@babel/helper-plugin-utils");
module.exports = helper_plugin_utils_1.declare(() => ({
    overrides: [
        {
            test: (filePath) => {
                if (/\.vue$/.test(filePath)) {
                    const template = fs_1.readFileSync(filePath, { encoding: 'utf8' });
                    return (template.includes('lang="ts"') || template.includes("lang='ts'"));
                }
                return false;
            },
            plugins: [require('@babel/plugin-transform-typescript')],
        },
    ],
}));
