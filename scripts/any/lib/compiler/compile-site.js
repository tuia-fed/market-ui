"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.compileSite = void 0;
function build() { }
function watch() { }
async function compileSite(production = false) {
    if (production) {
        await build();
    }
    else {
        watch();
    }
}
exports.compileSite = compileSite;
