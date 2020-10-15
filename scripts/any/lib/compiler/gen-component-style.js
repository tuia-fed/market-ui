"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.genComponentStyle = exports.analyzeComponentDeps = exports.clearDepsCache = exports.getDeps = exports.getPathByImport = exports.matchImports = void 0;
const fs_extra_1 = require("fs-extra");
const path_1 = require("path");
const common_1 = require("../common");
const constant_1 = require("../common/constant");
const css_1 = require("../common/css");
const IMPORT_RE = /import\s+?(?:(?:(?:[\w*\s{},]*)\s+from\s+?)|)(?:(?:".*?")|(?:'.*?'))[\s]*?(?:;|$|)/g;
// 找到代码中的依赖导入语句
function matchImports(code) {
    return code.match(IMPORT_RE) || [];
}
exports.matchImports = matchImports;
// 根据依赖路径，找到依赖的实际文件路径
function fillExt(filePath) {
    for (let i = 0; i < constant_1.ENTRY_EXTS.length; i++) {
        const completePath = `${filePath}${constant_1.ENTRY_EXTS[i]}`;
        if (fs_extra_1.existsSync(completePath)) {
            return completePath;
        }
    }
    for (let i = 0; i < constant_1.ENTRY_EXTS.length; i++) {
        const completePath = `${filePath}/index${constant_1.ENTRY_EXTS[i]}`;
        if (fs_extra_1.existsSync(completePath)) {
            return completePath;
        }
    }
    return '';
}
// 根据依赖导入语句，获取依赖的完整路径
function getPathByImport(code, filePath) {
    const divider = code.includes('"') ? '"' : "'";
    const relativePath = code.split(divider)[1];
    if (relativePath.includes('.')) {
        return fillExt(path_1.join(filePath, '..', relativePath));
    }
    return null;
}
exports.getPathByImport = getPathByImport;
// 依赖关系缓存
let depsMap = {};
// 找到当前文件的直接依赖
function getDeps(filepath) {
    if (depsMap[filepath])
        return depsMap[filepath];
    const code = fs_extra_1.readFileSync(filepath, 'utf-8');
    const imports = matchImports(code);
    const paths = imports
        .map(code => getPathByImport(code, filepath))
        .filter(item => !!item);
    depsMap[filepath] = paths;
    paths.forEach(getDeps);
    return paths;
}
exports.getDeps = getDeps;
// 清空依赖
function clearDepsCache() {
    depsMap = {};
}
exports.clearDepsCache = clearDepsCache;
// 获取样式文件路径
function getStyleRelativePath(component, dep, ext) {
    return path_1.relative(path_1.join(constant_1.ES_DIR, `${component}/style`), getPath(dep, ext));
}
// 获取组件在ES的样式入口路径
function getPath(component, ext) {
    return path_1.join(constant_1.ES_DIR, `${component}/index${ext}`);
}
// 判断这个路径是不是这个组件，为什么这么麻烦呢？
function matchPath(path, component) {
    const p = path_1.relative(constant_1.SRC_DIR, path);
    const arr = p.split(path_1.sep);
    return arr.includes(component);
}
// 分析组件的依赖
function analyzeComponentDeps(components, component) {
    const record = new Set();
    const componentEntry = fillExt(path_1.join(constant_1.SRC_DIR, component, 'index'));
    const deps = [];
    function search(filepath) {
        record.add(filepath);
        getDeps(filepath).forEach(key => {
            if (record.has(key))
                return;
            search(key);
            components
                // 找出当前路径的组件
                .filter(item => matchPath(key, item))
                // 其实是一个只有一项的数组，为什么要用数组呢
                .forEach(item => {
                // 依赖中不存在，且不是自身
                if (!deps.includes(item) && item !== component) {
                    deps.push(item);
                }
            });
        });
    }
    search(componentEntry);
    return deps;
}
exports.analyzeComponentDeps = analyzeComponentDeps;
let dpsMap = {};
// 生成所有组件的依赖
function genDepsMap(components) {
    components.forEach(componnet => {
        dpsMap[componnet] = analyzeComponentDeps(components, componnet);
    });
}
// 获取组件的依赖
function getComponentDeps(componnet) {
    return dpsMap[componnet];
}
// 两种类型的CSS入口
const OUTPUT_CONFIG = [
    {
        dir: constant_1.ES_DIR,
        template: (dep) => `import '${dep}';`
    },
    {
        dir: constant_1.LIB_DIR,
        template: (dep) => `require('${dep}');`
    }
];
// 根据依赖，找到样式依赖
function getComponentStyleDeps(deps, component) {
    const styleDeps = [];
    deps.forEach(dep => {
        if (css_1.isComponentCssExisted(dep)) {
            styleDeps.push(dep);
        }
    });
    return styleDeps;
}
// 生成入口文件
function genEntry(props) {
    const { basefile, component, filename, ext } = props;
    const deps = getComponentDeps(component);
    const styleDeps = getComponentStyleDeps(deps, component);
    const styleDepsPath = styleDeps.map(dep => getStyleRelativePath(component, dep, ext));
    OUTPUT_CONFIG.forEach(({ dir, template }) => {
        const outputDir = path_1.join(dir, component, 'style');
        const outputFile = path_1.join(outputDir, filename);
        let content = '';
        // 引入公共样式
        if (basefile) {
            const targetBasefile = common_1.replaceExt(basefile.replace(constant_1.SRC_DIR, dir), ext);
            content += template(path_1.relative(outputDir, targetBasefile));
            content += '\n';
        }
        // 引入依赖组件的样式
        content += styleDepsPath.map(template).join('\n');
        // 引入自己的样式
        content += '\n';
        content += template('../index' + ext);
        // window上
        content = content.replace(new RegExp('\\' + path_1.sep, 'g'), '/');
        fs_extra_1.outputFileSync(outputFile, content);
    });
}
/**
 * 生成所有组件的样式入口
 */
function genComponentStyle() {
    // 获取所有组件
    const components = common_1.getComponents();
    // 生成组件的依赖
    genDepsMap(components);
    // 组件是否有基础样式文件
    const basefile = css_1.getCssBaseFile();
    // 遍历组件生成对应的样式入口
    components.forEach(component => {
        genEntry({
            basefile,
            component,
            filename: 'index.js',
            ext: '.css'
        });
        if (constant_1.CSS_LANG !== 'css') {
            genEntry({
                basefile,
                component,
                filename: constant_1.CSS_LANG + '.js',
                ext: '.' + constant_1.CSS_LANG
            });
        }
    });
}
exports.genComponentStyle = genComponentStyle;
