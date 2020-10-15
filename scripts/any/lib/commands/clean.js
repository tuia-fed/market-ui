"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.clean = void 0;
const fs_extra_1 = require("fs-extra");
const constant_1 = require("../common/constant");
const logger_1 = require("../common/logger");
async function clean() {
    await Promise.all([fs_extra_1.remove(constant_1.ES_DIR), fs_extra_1.remove(constant_1.LIB_DIR), fs_extra_1.remove(constant_1.DIST_DIR)]);
    logger_1.consola.success('Clean ok');
}
exports.clean = clean;
