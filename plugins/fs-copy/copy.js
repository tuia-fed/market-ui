const fs = require('fs-extra')
const path = require('path')
const { isMd, resolvePath } = require('./utils')

module.exports = {
  // 获取目录下的.md文件
  async getMdFile(dir) {
    const files = fs.readdirSync(dir)
    await Promise.all(
      files.map(filename => {
        const filePath = path.join(dir, filename)
        // 文件夹，递归查询
        if (fs.lstatSync(filePath).isDirectory()) {
          this.getMdFile(filePath)
        }
        // 拷贝md文档文件
        if (isMd(filePath)) {
          const dirNameArr = filePath.split('/')
          // 组件名
          const dirName = dirNameArr[dirNameArr.length - 2]
          // docs/components下异步创建组件README.md
          const docsDir = path.join(resolvePath('../../docs'), `/components/${dirName}/README.md`)
          fs.ensureFile(docsDir).then(() => {
            fs.copyFile(filePath, docsDir)
          })
        }
      })
    )
  },
  // 清除docs/components目录下的内容
  async cleanDocs () {
    await fs.remove(resolvePath('../../docs/components'))
  }
}
