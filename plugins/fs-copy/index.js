const copy = require('./copy')
const chokidar = require('chokidar')
const chalk = require('chalk')
const { resolvePath } = require('./utils')

/* 监听文件变化自动拷贝 */
function start() {
  console.info('\nWatching file changes...');

  const SRCDIR = resolvePath('../../src')
  chokidar.watch(SRCDIR).on('change', async path => {
    try {
      await copy.getMdFile(SRCDIR)
      console.log(chalk.green(
        `文档拷贝成功!`
      ))
    } catch (error) {
      console.log(error)
    }
  })
}

start()
