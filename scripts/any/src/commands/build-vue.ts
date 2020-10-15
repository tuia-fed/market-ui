import { clean } from './clean'
import { installDependencies } from './installDependencies'
import {
  isStyle,
  isDir,
  isScript,
  setModuleEnv,
  setNodeEnv,
  isSfc
} from '../common'
import { consola, ora, slimPath } from '../common/logger'
import { copy, readdirSync } from 'fs-extra'
import { ES_DIR, LIB_DIR, SRC_DIR, CSS_LANG } from '../common/constant'
import { join } from 'path'
import chokidar from 'chokidar'

// compiler
import {
  compileJs,
  genComponentStyle,
  compileStyle,
  compileSfc,
  genPackageEntry,
  genPackageStyle,
  compilePackage
} from '../compiler'

// 编译文件
async function compileFile(filePath: string) {
  if (isScript(filePath)) {
    return compileJs(filePath)
  }

  if (isStyle(filePath)) {
    return compileStyle(filePath)
  }

  // if (isSfc(filePath)) {
  //   return compileSfc(filePath)
  // }
}

// 递归编译每个文件夹的内容
async function compileDir(dir: string) {
  const files = readdirSync(dir)

  await Promise.all(
    files.map(filename => {
      const filePath = join(dir, filename)

      if (isDir(filePath)) {
        return compileDir(filePath)
      }

      return compileFile(filePath)
    })
  )
}

// 编译 ESModule
async function buildEs() {
  setModuleEnv('esmodule')
  await copy(SRC_DIR, ES_DIR)
  await compileDir(ES_DIR)
}

// 编译 Commonjs
async function buildLib() {
  setModuleEnv('commonjs')
  await copy(SRC_DIR, LIB_DIR)
  await compileDir(LIB_DIR)
}

// 编译 style entry
async function buildStyleEntry() {
  genComponentStyle()
}

async function buildPacakgeEntry() {
  const esEntry = join(ES_DIR, 'index.js')
  const libEntry = join(LIB_DIR, 'index.js')
  const styleEntry = join(LIB_DIR, `index.${CSS_LANG}`)

  genPackageEntry({
    output: esEntry
  })

  setModuleEnv('esmodule')
  await compileJs(esEntry)

  genPackageStyle({
    output: styleEntry
  })

  setModuleEnv('commonjs')
  await copy(esEntry, libEntry)
  await compileJs(libEntry)
  await compileStyle(styleEntry)
}

async function buildPacakge() {
  setModuleEnv('esmodule')
  await compilePackage(true)
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
]

// 编译任务
async function runBuildTasks() {
  for (let i = 0; i < tasks.length; i++) {
    const { text, task } = tasks[i]
    const spinner = ora(text).start()

    try {
      await task()
      spinner.succeed(text)
    } catch (error) {
      spinner.fail(text)
      throw error
    }
  }
}

// 编译单个文件
async function compileEsFile(filepath: string) {
  setModuleEnv('esmodule')
  const esPath = filepath.replace(SRC_DIR, ES_DIR)
  await copy(filepath, esPath)
  await compileFile(esPath)
}
async function compileLibFile(filepath: string) {
  setModuleEnv('commonjs')
  const libPath = filepath.replace(SRC_DIR, LIB_DIR)
  await copy(filepath, libPath)
  await compileFile(libPath)
}

// 监听文件改变，单独编译改文件
function watchFileChange() {
  consola.info('Watching file changes...')

  chokidar.watch(SRC_DIR).on('change', async path => {
    const spinner = ora('File changed, start compilation...').start()

    try {
      await compileEsFile(path)
      await compileLibFile(path)
      spinner.succeed('Compiled: ' + slimPath(path))
    } catch (error) {
      spinner.fail('Compile failed: ' + path)
      consola.error(error)
    }
  })
}

export async function buildVue(cmd: { watch?: boolean } = {}) {
  setNodeEnv('production')

  try {
    await clean()
    await installDependencies()
    await runBuildTasks()

    if (cmd.watch) {
      watchFileChange()
    }
  } catch (err) {
    consola.error(err)
    process.exit(1)
  }
}
