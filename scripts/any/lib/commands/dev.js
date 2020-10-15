"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dev = void 0;
const fs_extra_1 = require("fs-extra");
const common_1 = require("../common");
const constant_1 = require("../common/constant");
const compiler_1 = require("../compiler");
async function dev(cmd = {}) {
    common_1.setNodeEnv('production');
    await fs_extra_1.emptyDir(constant_1.SITE_DIST_DIR);
    await compiler_1.compileSite(false);
}
exports.dev = dev;
