"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.compileLess = void 0;
const less_1 = require("less");
const fs_extra_1 = require("fs-extra");
// less plugin to resolve tilde
class TildeResolver extends less_1.FileManager {
    loadFile(filename, ...args) {
        filename = filename.replace('~', '');
        return less_1.FileManager.prototype.loadFile.apply(this, [filename, ...args]);
    }
}
const TildeResolverPlugin = {
    install(lessInstance, pluginManager) {
        pluginManager.addFileManager(new TildeResolver());
    },
};
async function compileLess(filePath) {
    const source = fs_extra_1.readFileSync(filePath, 'utf-8');
    const { css } = await less_1.render(source, {
        filename: filePath,
        plugins: [TildeResolverPlugin],
    });
    return css;
}
exports.compileLess = compileLess;
