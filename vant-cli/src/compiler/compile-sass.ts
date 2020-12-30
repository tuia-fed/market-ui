import { renderSync } from 'sass';

// allow to import from node_modules
// @import "~package-name/var.scss"
const tildeImporter = (url: string) => {
  if (url.includes('~')) {
    url = url.replace('~', '');

    if (!url.includes('.scss')) {
      url += '.scss';
    }

    url = require.resolve(url);
  }
  return { file: url };
};

export async function compileSass(filePath: string) {
  const { css } = renderSync({ file: filePath, importer: tildeImporter });
  return css;
}
