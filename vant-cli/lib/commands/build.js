"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.build = void 0;
const chokidar_1 = __importDefault(require("chokidar")); // 监听文件变化的插件
const path_1 = require("path");
const fs_extra_1 = require("fs-extra");
const clean_1 = require("./clean");
const css_1 = require("../common/css");
const logger_1 = require("../common/logger");
const compile_js_1 = require("../compiler/compile-js");
const compile_sfc_1 = require("../compiler/compile-sfc");
const compile_style_1 = require("../compiler/compile-style");
const compile_package_1 = require("../compiler/compile-package");
const gen_package_entry_1 = require("../compiler/gen-package-entry");
const gen_style_deps_map_1 = require("../compiler/gen-style-deps-map");
const gen_component_style_1 = require("../compiler/gen-component-style");
const constant_1 = require("../common/constant");
const gen_package_style_1 = require("../compiler/gen-package-style");
const gen_vetur_config_1 = require("../compiler/gen-vetur-config");
const common_1 = require("../common");
async function compileFile(filePath) {
    if (common_1.isSfc(filePath)) { // vue
        return compile_sfc_1.compileSfc(filePath);
    }
    if (common_1.isScript(filePath)) { // js ts jsx tsx
        return compile_js_1.compileJs(filePath);
    }
    if (common_1.isStyle(filePath)) { // css less sass
        return compile_style_1.compileStyle(filePath);
    }
    return fs_extra_1.remove(filePath);
}
async function compileDir(dir) {
    const files = fs_extra_1.readdirSync(dir);
    await Promise.all(files.map((filename) => {
        const filePath = path_1.join(dir, filename);
        if (common_1.isDemoDir(filePath) || common_1.isTestDir(filePath)) {
            // 移除测试的文件
            return fs_extra_1.remove(filePath);
        }
        if (common_1.isDir(filePath)) {
            // 是文件夹则递归编译
            return compileDir(filePath);
        }
        // 编译文件
        return compileFile(filePath);
    }));
}
async function buildEs() {
    common_1.setModuleEnv('esmodule'); // process.env.BABEL_MODULE = esmodule
    common_1.setBuildTarget('package'); // process.env.BUILD_TARGET = package
    await fs_extra_1.copy(constant_1.SRC_DIR, constant_1.ES_DIR); // 拷贝src下面的文件到es文件夹里
    await compileDir(constant_1.ES_DIR); // 编译文件夹
}
async function buildLib() {
    common_1.setModuleEnv('commonjs');
    common_1.setBuildTarget('package');
    await fs_extra_1.copy(constant_1.SRC_DIR, constant_1.LIB_DIR);
    await compileDir(constant_1.LIB_DIR);
}
async function buildStyleEntry() {
    await gen_style_deps_map_1.genStyleDepsMap();
    gen_component_style_1.genComponentStyle();
}
async function buildPacakgeEntry() {
    const esEntryFile = path_1.join(constant_1.ES_DIR, 'index.js');
    const libEntryFile = path_1.join(constant_1.LIB_DIR, 'index.js');
    const styleEntryFile = path_1.join(constant_1.LIB_DIR, `index.${css_1.CSS_LANG}`);
    gen_package_entry_1.genPackageEntry({
        outputPath: esEntryFile,
        pathResolver: (path) => `./${path_1.relative(constant_1.SRC_DIR, path)}`,
    });
    common_1.setModuleEnv('esmodule');
    await compile_js_1.compileJs(esEntryFile);
    gen_package_style_1.genPacakgeStyle({
        outputPath: styleEntryFile,
        pathResolver: (path) => path.replace(constant_1.SRC_DIR, '.'),
    });
    common_1.setModuleEnv('commonjs');
    await fs_extra_1.copy(esEntryFile, libEntryFile);
    await compile_js_1.compileJs(libEntryFile);
    await compile_style_1.compileStyle(styleEntryFile);
}
async function buildPackages() {
    common_1.setModuleEnv('esmodule');
    await compile_package_1.compilePackage(false);
    await compile_package_1.compilePackage(true);
    gen_vetur_config_1.genVeturConfig();
}
const tasks = [
    {
        text: 'Build ESModule Outputs',
        task: buildEs,
    },
    {
        text: 'Build Commonjs Outputs',
        task: buildLib,
    },
    {
        text: 'Build Style Entry',
        task: buildStyleEntry,
    },
    {
        text: 'Build Package Entry',
        task: buildPacakgeEntry,
    },
    {
        text: 'Build Packed Outputs',
        task: buildPackages,
    },
];
async function runBuildTasks() {
    for (let i = 0; i < tasks.length; i++) {
        const { task, text } = tasks[i];
        const spinner = logger_1.ora(text).start();
        try {
            /* eslint-disable no-await-in-loop */
            await task();
            spinner.succeed(text);
        }
        catch (err) {
            spinner.fail(text);
            console.log(err);
            throw err;
        }
    }
    logger_1.consola.success('Compile successfully');
}
function watchFileChange() {
    logger_1.consola.info('Watching file changes...');
    chokidar_1.default.watch(constant_1.SRC_DIR).on('change', async (path) => {
        if (common_1.isDemoDir(path) || common_1.isTestDir(path)) {
            return;
        }
        const spinner = logger_1.ora('File changed, start compilation...').start();
        const esPath = path.replace(constant_1.SRC_DIR, constant_1.ES_DIR);
        const libPath = path.replace(constant_1.SRC_DIR, constant_1.LIB_DIR);
        try {
            await fs_extra_1.copy(path, esPath);
            await fs_extra_1.copy(path, libPath);
            await compileFile(esPath);
            await compileFile(libPath);
            await gen_style_deps_map_1.genStyleDepsMap();
            gen_component_style_1.genComponentStyle({ cache: false });
            spinner.succeed('Compiled: ' + logger_1.slimPath(path));
        }
        catch (err) {
            spinner.fail('Compile failed: ' + path);
            console.log(err);
        }
    });
}
async function build(cmd = {}) {
    common_1.setNodeEnv('production'); // 设置 process.env.NODE_ENV = production
    try {
        await clean_1.clean(); // 移除原来的文件
        // await installDependencies(); // 安装依赖
        await runBuildTasks();
        if (cmd.watch) {
            watchFileChange();
        }
    }
    catch (err) {
        logger_1.consola.error('Build failed');
        process.exit(1);
    }
}
exports.build = build;
