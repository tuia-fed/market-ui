export declare function matchImports(code: string): RegExpMatchArray;
export declare function getPathByImport(code: string, filePath: string): string | null;
export declare function getDeps(filepath: string): string[];
export declare function clearDepsCache(): void;
export declare function analyzeComponentDeps(components: string[], component: string): string[];
/**
 * 生成所有组件的样式入口
 */
export declare function genComponentStyle(): void;
