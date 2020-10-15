import { execSync } from 'child_process'
import { existsSync, readdirSync } from 'fs-extra'
import { join } from 'path'
import { ENTRY_EXTS, SRC_DIR } from './constant'

export * from './is'

// 环境变量类型
export type NodeEnv = 'development' | 'production'
export type ModuleEnv = 'esmodule' | 'commonjs'

// 设置环境变量
export function setNodeEnv(value: NodeEnv) {
  process.env.NODE_ENV = value
}
export function setModuleEnv(value: ModuleEnv) {
  process.env.MODULE_ENV = value
}

let hasYarnCache: boolean

// 判断用户是否安装了yarn
export function hasYarn() {
  if (hasYarnCache === undefined) {
    try {
      execSync('yarn --version', { stdio: 'ignore' })
      hasYarnCache = true
    } catch (e) {
      hasYarnCache = false
    }
  }

  return hasYarnCache
}

export const EXT_REGEXP = /\.\w+$/

// 替换文件后缀名
export function replaceExt(path: string, ext: string) {
  return path.replace(EXT_REGEXP, ext)
}

// 获取所有组件
export function getComponents() {
  const excludes = ['.DS_Store']
  const dirs = readdirSync(SRC_DIR)

  return dirs
    .filter(dir => !excludes.includes(dir))
    .filter(dir => {
      return ENTRY_EXTS.some(ext => {
        const path = join(SRC_DIR, dir, `index${ext}`)
        if (existsSync(path)) {
          return true
        }

        return false
      })
    })
}

const camelizeRE = /-(\w)/g
const pascalizeRE = /(\w)(\w*)/g

// '-a' => 'A'
export function camelize(str: string): string {
  return str.replace(camelizeRE, (_, c) => c.toUpperCase())
}

// 'a-bcc' => 'ABcc' 'abc-def' => 'AbcDef'
export function pascalize(str: string): string {
  return camelize(str).replace(
    pascalizeRE,
    (_, c1, c2) => c1.toUpperCase() + c2
  )
}
