export declare const STYLE_LESS_EXT = ".less";
export declare function getCssBaseFile(): string;
export declare function isComponentCssExisted(component: string): boolean;
export declare function getPostcssConfig(): any;
export declare function isLess(filepath: string): boolean;
export declare function replaceCssImport(code: string): string;
