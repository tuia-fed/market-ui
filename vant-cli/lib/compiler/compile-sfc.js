"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.compileSfc = exports.parseSfc = void 0;
const hash_sum_1 = __importDefault(require("hash-sum"));
const path_1 = __importDefault(require("path"));
const compiler_sfc_1 = require("@vue/compiler-sfc");
const fs_extra_1 = require("fs-extra");
const common_1 = require("../common");
const compile_js_1 = require("./compile-js");
const compile_style_1 = require("./compile-style");
const RENDER_FN = '__vue_render__';
const EXPORT = 'export default {';
// trim some unused code
function trim(code) {
    return code.replace(/\/\/\n/g, '').trim();
}
function getSfcStylePath(filePath, ext, index) {
    const number = index !== 0 ? `-${index + 1}` : '';
    return common_1.replaceExt(filePath, `-sfc${number}.${ext}`);
}
// inject render fn to script
function injectRender(script, render) {
    script = trim(script);
    render = render.replace('export function render', `function ${RENDER_FN}`);
    return script.replace(EXPORT, `${render}\n${EXPORT}\n  render: ${RENDER_FN},\n`);
}
function injectScopeId(script, scopeId) {
    return script.replace(EXPORT, `${EXPORT}\n  _scopeId: '${scopeId}',\n\n`);
}
function injectStyle(script, styles, filePath) {
    if (styles.length) {
        const imports = styles
            .map((style, index) => {
            const { base } = path_1.default.parse(getSfcStylePath(filePath, 'css', index));
            return `import './${base}';`;
        })
            .join('\n');
        return script.replace(EXPORT, `${imports}\n\n${EXPORT}`);
    }
    return script;
}
function parseSfc(filename) {
    const source = fs_extra_1.readFileSync(filename, 'utf-8');
    const { descriptor } = compiler_sfc_1.parse(source, {
        filename,
    });
    return descriptor;
}
exports.parseSfc = parseSfc;
async function compileSfc(filePath) {
    const tasks = [fs_extra_1.remove(filePath)];
    const source = fs_extra_1.readFileSync(filePath, 'utf-8');
    const descriptor = parseSfc(filePath);
    const { template, styles } = descriptor;
    const hasScoped = styles.some((s) => s.scoped);
    const scopeId = hasScoped ? `data-v-${hash_sum_1.default(source)}` : '';
    // compile js part
    if (descriptor.script) {
        const lang = descriptor.script.lang || 'js';
        const scriptFilePath = common_1.replaceExt(filePath, `.${lang}`);
        tasks.push(new Promise((resolve, reject) => {
            let script = descriptor.script.content;
            script = injectStyle(script, styles, filePath);
            if (template) {
                const render = compiler_sfc_1.compileTemplate({
                    id: scopeId,
                    source: template.content,
                    filename: filePath,
                }).code;
                script = injectRender(script, render);
            }
            if (scopeId) {
                script = injectScopeId(script, scopeId);
            }
            fs_extra_1.writeFileSync(scriptFilePath, script);
            compile_js_1.compileJs(scriptFilePath).then(resolve).catch(reject);
        }));
    }
    // compile style part
    tasks.push(...styles.map((style, index) => {
        const cssFilePath = getSfcStylePath(filePath, style.lang || 'css', index);
        const styleSource = trim(style.content);
        // TODO support scoped
        // if (style.scoped) {
        //   styleSource = compileUtils.compileStyle({
        //     id: scopeId,
        //     scoped: true,
        //     source: styleSource,
        //     filename: cssFilePath,
        //     preprocessLang: style.lang,
        //   }).code;
        // }
        fs_extra_1.writeFileSync(cssFilePath, styleSource);
        return compile_style_1.compileStyle(cssFilePath);
    }));
    return Promise.all(tasks);
}
exports.compileSfc = compileSfc;
