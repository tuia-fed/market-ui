import chokidar from 'chokidar'; // 监听文件变化的插件
import { join, relative } from 'path';
import { remove, copy, readdirSync } from 'fs-extra';
import { clean } from './clean';
import { CSS_LANG } from '../common/css';
import { ora, consola, slimPath } from '../common/logger';
import { installDependencies } from '../common/manager';
import { compileJs } from '../compiler/compile-js';
import { compileSfc } from '../compiler/compile-sfc';
import { compileStyle } from '../compiler/compile-style';
import { compilePackage } from '../compiler/compile-package';
import { genPackageEntry } from '../compiler/gen-package-entry';
import { genStyleDepsMap } from '../compiler/gen-style-deps-map';
import { genComponentStyle } from '../compiler/gen-component-style';
import { SRC_DIR, LIB_DIR, ES_DIR } from '../common/constant';
import { genPacakgeStyle } from '../compiler/gen-package-style';
import { genVeturConfig } from '../compiler/gen-vetur-config';
import {
  isDir,
  isSfc,
  isStyle,
  isScript,
  isDemoDir,
  isTestDir,
  setNodeEnv,
  setModuleEnv,
  setBuildTarget,
} from '../common';

async function compileFile(filePath: string) {
  if (isSfc(filePath)) {  // vue
    return compileSfc(filePath);
  }

  if (isScript(filePath)) { // js ts jsx tsx
    return compileJs(filePath);
  }

  if (isStyle(filePath)) { // css less sass
    return compileStyle(filePath);
  }

  return remove(filePath);
}

async function compileDir(dir: string) {
  const files = readdirSync(dir);

  await Promise.all(
    files.map((filename) => {
      const filePath = join(dir, filename);

      if (isDemoDir(filePath) || isTestDir(filePath)) {
        // 移除测试的文件
        return remove(filePath);
      }

      if (isDir(filePath)) {
        // 是文件夹则递归编译
        return compileDir(filePath);
      }
      // 编译文件
      return compileFile(filePath);
    })
  );
}

async function buildEs() {
  setModuleEnv('esmodule'); // process.env.BABEL_MODULE = esmodule
  setBuildTarget('package'); // process.env.BUILD_TARGET = package
  await copy(SRC_DIR, ES_DIR); // 拷贝src下面的文件到es文件夹里
  await compileDir(ES_DIR); // 编译文件夹
}

async function buildLib() {
  setModuleEnv('commonjs');
  setBuildTarget('package');
  await copy(SRC_DIR, LIB_DIR);
  await compileDir(LIB_DIR);
}

async function buildStyleEntry() {
  await genStyleDepsMap();
  genComponentStyle();
}

async function buildPacakgeEntry() {
  const esEntryFile = join(ES_DIR, 'index.js');
  const libEntryFile = join(LIB_DIR, 'index.js');
  const styleEntryFile = join(LIB_DIR, `index.${CSS_LANG}`);

  genPackageEntry({
    outputPath: esEntryFile,
    pathResolver: (path: string) => `./${relative(SRC_DIR, path)}`,
  });

  setModuleEnv('esmodule');
  await compileJs(esEntryFile);

  genPacakgeStyle({
    outputPath: styleEntryFile,
    pathResolver: (path: string) => path.replace(SRC_DIR, '.'),
  });

  setModuleEnv('commonjs');
  await copy(esEntryFile, libEntryFile);
  await compileJs(libEntryFile);
  await compileStyle(styleEntryFile);
}

async function buildPackages() {
  setModuleEnv('esmodule');
  await compilePackage(false);
  await compilePackage(true);
  genVeturConfig();
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
    const spinner = ora(text).start();

    try {
      /* eslint-disable no-await-in-loop */
      await task();
      spinner.succeed(text);
    } catch (err) {
      spinner.fail(text);
      console.log(err);
      throw err;
    }
  }

  consola.success('Compile successfully');
}

function watchFileChange() {
  consola.info('Watching file changes...');

  chokidar.watch(SRC_DIR).on('change', async (path) => {
    if (isDemoDir(path) || isTestDir(path)) {
      return;
    }

    const spinner = ora('File changed, start compilation...').start();
    const esPath = path.replace(SRC_DIR, ES_DIR);
    const libPath = path.replace(SRC_DIR, LIB_DIR);

    try {
      await copy(path, esPath);
      await copy(path, libPath);
      await compileFile(esPath);
      await compileFile(libPath);
      await genStyleDepsMap();
      genComponentStyle({ cache: false });
      spinner.succeed('Compiled: ' + slimPath(path));
    } catch (err) {
      spinner.fail('Compile failed: ' + path);
      console.log(err);
    }
  });
}

export async function build(cmd: { watch?: boolean } = {}) {
  setNodeEnv('production'); // 设置 process.env.NODE_ENV = production

  try {
    await clean();  // 移除原来的文件
    // await installDependencies(); // 安装依赖
    await runBuildTasks();

    if (cmd.watch) {
      watchFileChange();
    }
  } catch (err) {
    consola.error('Build failed');
    process.exit(1);
  }
}
