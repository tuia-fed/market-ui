import { transformAsync } from '@babel/core'
import { outputFileSync, readFileSync, removeSync } from 'fs-extra'
import { replaceExt } from '../common'
import { replaceCssImport } from '../common/css'

export async function compileJs(filepath: string) {
  return new Promise((resolve, reject) => {
    let code = readFileSync(filepath, 'utf-8')

    code = replaceCssImport(code)

    transformAsync(code, {
      filename: filepath,
      // todo 临时方案
      cwd: process.cwd() + '/scripts/any'
    })
      .then(result => {
        if (result) {
          // 输出为js文件
          const jsFilePath = replaceExt(filepath, '.js')
          // 移除原文件
          removeSync(filepath)
          // 输出
          outputFileSync(jsFilePath, result.code)
          resolve()
        }
      })
      .catch(reject)
  })
}
