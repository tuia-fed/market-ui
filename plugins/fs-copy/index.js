const copy = require('./copy')
const chokidar = require('chokidar')
const chalk = require('chalk')
const { resolvePath } = require('./utils')

function start() {
  console.info('\nWatching file changes...');

  const SRCDIR = resolvePath('../../src')
  const copyFn = async () => {
    try {
      await copy.cleanDocs()
      await copy.getMdFile(SRCDIR)
      console.log(chalk.green(
        `文档拷贝成功!`
      ))
    } catch (error) {
      console.log(error)
    }
  }
  // 先拷贝一次
  copyFn()
  /* 监听文件变化自动拷贝 */
  if (process.env.NODE_ENV === 'development') {
    chokidar.watch(SRCDIR).on('change', copyFn)
  }
}

start()
