"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.buildVue = void 0;
const clean_1 = require("./clean");
const installDependencies_1 = require("./installDependencies");
const common_1 = require("../common");
const logger_1 = require("../common/logger");
const fs_extra_1 = require("fs-extra");
const constant_1 = require("../common/constant");
const path_1 = require("path");
const chokidar_1 = __importDefault(require("chokidar"));
// compiler
const compiler_1 = require("../compiler");
// 编译文件
async function compileFile(filePath) {
    if (common_1.isScript(filePath)) {
        return compiler_1.compileJs(filePath);
    }
    if (common_1.isStyle(filePath)) {
        return compiler_1.compileStyle(filePath);
    }
    // if (isSfc(filePath)) {
    //   return compileSfc(filePath)
    // }
}
// 递归编译每个文件夹的内容
async function compileDir(dir) {
    const files = fs_extra_1.readdirSync(dir);
    await Promise.all(files.map(filename => {
        const filePath = path_1.join(dir, filename);
        if (common_1.isDir(filePath)) {
            return compileDir(filePath);
        }
        return compileFile(filePath);
    }));
}
// 编译 ESModule
async function buildEs() {
    common_1.setModuleEnv('esmodule');
    await fs_extra_1.copy(constant_1.SRC_DIR, constant_1.ES_DIR);
    await compileDir(constant_1.ES_DIR);
}
// 编译 Commonjs
async function buildLib() {
    common_1.setModuleEnv('commonjs');
    await fs_extra_1.copy(constant_1.SRC_DIR, constant_1.LIB_DIR);
    await compileDir(constant_1.LIB_DIR);
}
// 编译 style entry
async function buildStyleEntry() {
    compiler_1.genComponentStyle();
}
async function buildPacakgeEntry() {
    const esEntry = path_1.join(constant_1.ES_DIR, 'index.js');
    const libEntry = path_1.join(constant_1.LIB_DIR, 'index.js');
    const styleEntry = path_1.join(constant_1.LIB_DIR, `index.${constant_1.CSS_LANG}`);
    compiler_1.genPackageEntry({
        output: esEntry
    });
    common_1.setModuleEnv('esmodule');
    await compiler_1.compileJs(esEntry);
    compiler_1.genPackageStyle({
        output: styleEntry
    });
    common_1.setModuleEnv('commonjs');
    await fs_extra_1.copy(esEntry, libEntry);
    await compiler_1.compileJs(libEntry);
    await compiler_1.compileStyle(styleEntry);
}
async function buildPacakge() {
    common_1.setModuleEnv('esmodule');
    await compiler_1.compilePackage(true);
}
// 任务队列
const tasks = [
    {
        text: 'Build ESModule',
        task: buildEs
    },
    {
        text: 'Build Commonjs',
        task: buildLib
    },
    {
        text: 'Build Style Entry',
        task: buildStyleEntry
    },
    {
        text: 'Build Package Entry',
        task: buildPacakgeEntry
    },
    {
        text: 'Build Package',
        task: buildPacakge
    }
];
// 编译任务
async function runBuildTasks() {
    for (let i = 0; i < tasks.length; i++) {
        const { text, task } = tasks[i];
        const spinner = logger_1.ora(text).start();
        try {
            await task();
            spinner.succeed(text);
        }
        catch (error) {
            spinner.fail(text);
            throw error;
        }
    }
}
// 编译单个文件
async function compileEsFile(filepath) {
    common_1.setModuleEnv('esmodule');
    const esPath = filepath.replace(constant_1.SRC_DIR, constant_1.ES_DIR);
    await fs_extra_1.copy(filepath, esPath);
    await compileFile(esPath);
}
async function compileLibFile(filepath) {
    common_1.setModuleEnv('commonjs');
    const libPath = filepath.replace(constant_1.SRC_DIR, constant_1.LIB_DIR);
    await fs_extra_1.copy(filepath, libPath);
    await compileFile(libPath);
}
// 监听文件改变，单独编译改文件
function watchFileChange() {
    logger_1.consola.info('Watching file changes...');
    chokidar_1.default.watch(constant_1.SRC_DIR).on('change', async (path) => {
        const spinner = logger_1.ora('File changed, start compilation...').start();
        try {
            await compileEsFile(path);
            await compileLibFile(path);
            spinner.succeed('Compiled: ' + logger_1.slimPath(path));
        }
        catch (error) {
            spinner.fail('Compile failed: ' + path);
            logger_1.consola.error(error);
        }
    });
}
async function buildVue(cmd = {}) {
    common_1.setNodeEnv('production');
    try {
        await clean_1.clean();
        await installDependencies_1.installDependencies();
        await runBuildTasks();
        if (cmd.watch) {
            watchFileChange();
        }
    }
    catch (err) {
        logger_1.consola.error(err);
        process.exit(1);
    }
}
exports.buildVue = buildVue;
