import { existsSync } from 'fs-extra'
import { get } from 'lodash'
import { join, isAbsolute, parse } from 'path'
import {
  CSS_LANG,
  getConfig,
  ROOT_POSTCSS_CONFIG_FILE,
  SRC_DIR,
  STYLE_DIR
} from './constant'

export const STYLE_LESS_EXT = '.less'

// 获取基础样式文件
export function getCssBaseFile() {
  const config = getConfig()
  // 默认路径
  let path = join(STYLE_DIR, `index.${CSS_LANG}`)

  // 如果用户有配置
  const baseFile = get(config, 'build.css.base')
  if (baseFile) {
    path = isAbsolute(baseFile) ? baseFile : join(SRC_DIR, baseFile)
  }

  // 文件存在
  if (existsSync(path)) {
    return path
  }

  return ''
}

// 判断组件的样式文件是否存在
export function isComponentCssExisted(component: string) {
  return existsSync(join(SRC_DIR, `${component}/index.${CSS_LANG}`))
}

// 获取postcss的配置
export function getPostcssConfig() {
  if (existsSync(ROOT_POSTCSS_CONFIG_FILE)) {
    return require(ROOT_POSTCSS_CONFIG_FILE)
  }

  return {}
}

// 判断文件是不是less
export function isLess(filepath: string) {
  const parsePath = parse(filepath)
  return parsePath.ext === STYLE_LESS_EXT
}

const IMPORT_STYLE_RE = /import\s+?(?:(?:".*?")|(?:'.*?'))[\s]*?(?:;|$|)/g

// "import 'a.less';" => "import 'a.css';"
export function replaceCssImport(code: string) {
  return code.replace(IMPORT_STYLE_RE, str =>
    str.replace(`.${CSS_LANG}`, '.css')
  )
}
