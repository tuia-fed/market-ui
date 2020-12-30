"use strict";
/**
 * Build style entry of all components
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.genComponentStyle = void 0;
const path_1 = require("path");
const fs_extra_1 = require("fs-extra");
const common_1 = require("../common");
const css_1 = require("../common/css");
const gen_style_deps_map_1 = require("./gen-style-deps-map");
const constant_1 = require("../common/constant");
function getDeps(component) {
    const styleDepsJson = require(constant_1.STYPE_DEPS_JSON_FILE);
    if (styleDepsJson.map[component]) {
        const deps = styleDepsJson.map[component].slice(0);
        if (gen_style_deps_map_1.checkStyleExists(component)) {
            deps.push(component);
        }
        return deps;
    }
    return [];
}
function getPath(component, ext = '.css') {
    return path_1.join(constant_1.ES_DIR, `${component}/index${ext}`);
}
function getRelativePath(component, style, ext) {
    return path_1.relative(path_1.join(constant_1.ES_DIR, `${component}/style`), getPath(style, ext));
}
const OUTPUT_CONFIG = [
    {
        dir: constant_1.ES_DIR,
        template: (dep) => `import '${dep}';`,
    },
    {
        dir: constant_1.LIB_DIR,
        template: (dep) => `require('${dep}');`,
    },
];
function genEntry(params) {
    const { ext, filename, component, baseFile } = params;
    const deps = getDeps(component);
    const depsPath = deps.map(dep => getRelativePath(component, dep, ext));
    OUTPUT_CONFIG.forEach(({ dir, template }) => {
        const outputDir = path_1.join(dir, component, 'style');
        const outputFile = path_1.join(outputDir, filename);
        let content = '';
        if (baseFile) {
            const compiledBaseFile = common_1.replaceExt(baseFile.replace(constant_1.SRC_DIR, dir), ext);
            content += template(path_1.relative(outputDir, compiledBaseFile));
            content += '\n';
        }
        content += depsPath.map(template).join('\n');
        content = content.replace(new RegExp('\\' + path_1.sep, 'g'), '/');
        fs_extra_1.outputFileSync(outputFile, content);
    });
}
function genComponentStyle(options = { cache: true }) {
    if (!options.cache) {
        delete require.cache[constant_1.STYPE_DEPS_JSON_FILE];
    }
    const components = common_1.getComponents();
    const baseFile = css_1.getCssBaseFile();
    components.forEach(component => {
        genEntry({
            baseFile,
            component,
            filename: 'index.js',
            ext: '.css',
        });
        if (css_1.CSS_LANG !== 'css') {
            genEntry({
                baseFile,
                component,
                filename: css_1.CSS_LANG + '.js',
                ext: '.' + css_1.CSS_LANG,
            });
        }
    });
}
exports.genComponentStyle = genComponentStyle;
