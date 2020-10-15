"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.STYLE_DIR = exports.FRAMEWORk = exports.CSS_LANG = exports.SRC_DIR = exports.getConfig = exports.getPackageJson = exports.requireNoCache = exports.ENTRY_EXTS = exports.STYLE_EXTS = exports.SCRIPT_EXTS = exports.POSTCSS_CONFIG_FILE = exports.BABEL_CONFIG_FILE = exports.CONFIG_DIR = exports.DIST_DIR = exports.CACHE_DIR = exports.ROOT_POSTCSS_CONFIG_FILE = exports.ROOT_WEBPACK_CONFIG_FILE = exports.PACKAGE_JSON_FILE = exports.CONFIG_FILE = exports.SITE_DIST_DIR = exports.LIB_DIR = exports.ES_DIR = exports.ROOT = exports.CWD = exports.GREEN = exports.CONFIG_FILE_NAME = exports.NAME = void 0;
const lodash_1 = require("lodash");
const fs_extra_1 = require("fs-extra");
const path_1 = require("path");
exports.NAME = 'any';
exports.CONFIG_FILE_NAME = exports.NAME + '.config.js';
// 一直向外找，找到存在配置文件的根路径
function findRootDir(dir) {
    if (dir === '/') {
        return '/';
    }
    if (fs_extra_1.existsSync(path_1.join(dir, exports.CONFIG_FILE_NAME))) {
        return dir;
    }
    return findRootDir(path_1.dirname(dir));
}
// 颜色
exports.GREEN = '#07c160';
// 项目路径
exports.CWD = process.cwd();
exports.ROOT = findRootDir(exports.CWD);
exports.ES_DIR = path_1.join(exports.ROOT, 'es');
exports.LIB_DIR = path_1.join(exports.ROOT, 'lib');
exports.SITE_DIST_DIR = path_1.join(exports.ROOT, 'site');
exports.CONFIG_FILE = path_1.join(exports.ROOT, exports.CONFIG_FILE_NAME);
exports.PACKAGE_JSON_FILE = path_1.join(exports.ROOT, 'package.json');
exports.ROOT_WEBPACK_CONFIG_FILE = path_1.join(exports.ROOT, 'webpack.config.js');
exports.ROOT_POSTCSS_CONFIG_FILE = path_1.join(exports.ROOT, 'postcss.config.js');
exports.CACHE_DIR = path_1.join(exports.ROOT, 'node_modules/.cache');
// 默认路径
exports.DIST_DIR = path_1.join(__dirname, '../../dist');
exports.CONFIG_DIR = path_1.join(__dirname, '../config');
// Config files
exports.BABEL_CONFIG_FILE = path_1.join(exports.CONFIG_DIR, 'babel.config.js');
exports.POSTCSS_CONFIG_FILE = path_1.join(exports.CONFIG_DIR, 'postcss.config.js');
// 文件类型
exports.SCRIPT_EXTS = ['.tsx', '.jsx', '.ts', '.js', '.vue'];
exports.STYLE_EXTS = ['.less', '.css'];
exports.ENTRY_EXTS = exports.SCRIPT_EXTS;
// 没有缓存的引入依赖
function requireNoCache(filepath) {
    delete require.cache[filepath];
    return require(filepath);
}
exports.requireNoCache = requireNoCache;
// 获取package.json
function getPackageJson() {
    return requireNoCache(exports.PACKAGE_JSON_FILE);
}
exports.getPackageJson = getPackageJson;
// 获取配置文件
function getConfig() {
    try {
        return requireNoCache(exports.CONFIG_FILE);
    }
    catch (err) {
        return {};
    }
}
exports.getConfig = getConfig;
// 获取源码路径，默认为src
function getSrcDir() {
    const config = getConfig();
    const srcDir = lodash_1.get(config, 'build.src');
    if (srcDir) {
        if (path_1.isAbsolute(srcDir)) {
            return srcDir;
        }
        return path_1.join(exports.ROOT, srcDir);
    }
    return path_1.join(exports.ROOT, 'src');
}
exports.SRC_DIR = getSrcDir();
// 获取css语言，默认为src
function getCssLang() {
    const config = getConfig();
    const cssLang = lodash_1.get(config, 'build.css.preprocessor');
    if (cssLang) {
        return cssLang;
    }
    return 'less';
}
exports.CSS_LANG = getCssLang();
// 获取框架类型
function getFramework() {
    const config = getConfig();
    const framework = lodash_1.get(config, 'build.framework');
    return framework;
}
exports.FRAMEWORk = getFramework();
// 源码样式路径
exports.STYLE_DIR = path_1.join(exports.SRC_DIR, 'style');
