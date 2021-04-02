"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.compilePackage = void 0;
const webpack_1 = __importDefault(require("webpack"));
const webpack_package_1 = require("../config/webpack.package");
async function compilePackage(isMinify) {
    return new Promise((resolve, reject) => {
        const config = webpack_package_1.getPackageConfig(isMinify);
        webpack_1.default(config, (err, stats) => {
            if (err || (stats && stats.hasErrors())) {
                reject();
            }
            else {
                resolve();
            }
        });
    });
}
exports.compilePackage = compilePackage;
