"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.clean = void 0;
const fs_extra_1 = require("fs-extra");
const constant_1 = require("../common/constant");
async function clean() {
    await Promise.all([
        fs_extra_1.remove(constant_1.ES_DIR),
        fs_extra_1.remove(constant_1.LIB_DIR),
        fs_extra_1.remove(constant_1.DIST_DIR),
        fs_extra_1.remove(constant_1.VETUR_DIR),
        fs_extra_1.remove(constant_1.SITE_DIST_DIR),
    ]);
}
exports.clean = clean;
