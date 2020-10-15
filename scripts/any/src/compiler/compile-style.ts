import { outputFileSync, readFileSync } from 'fs-extra'
import { parse } from 'path'
import { replaceExt } from '../common'
import { consola } from '../common/logger'
import { compileCss } from './compile-css'
import { compileLess } from './compile-less'

async function compileFile(filepath: string) {
  const res = parse(filepath)

  try {
    // 如果是less
    if (res.ext === '.less') {
      const source = await compileLess(filepath)
      return await compileCss(source)
    }

    // 其他情况都看作css
    const source = readFileSync(filepath, 'utf-8')
    return await compileCss(source)
  } catch (error) {
    consola.error('Compile style failed: ' + filepath)
    throw error
  }
}

// 编译样式文件
export async function compileStyle(filepath: string) {
  const css = await compileFile(filepath)

  outputFileSync(replaceExt(filepath, '.css'), css)
}
