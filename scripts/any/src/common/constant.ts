import { get } from 'lodash'
import { existsSync } from 'fs-extra'
import { join, dirname, isAbsolute } from 'path'

export const NAME = 'any'

export const CONFIG_FILE_NAME = NAME + '.config.js'

// 一直向外找，找到存在配置文件的根路径
function findRootDir(dir: string): string {
  if (dir === '/') {
    return '/'
  }

  if (existsSync(join(dir, CONFIG_FILE_NAME))) {
    return dir
  }

  return findRootDir(dirname(dir))
}

// 颜色
export const GREEN = '#07c160'

// 项目路径
export const CWD = process.cwd()
export const ROOT = findRootDir(CWD)
export const ES_DIR = join(ROOT, 'es')
export const LIB_DIR = join(ROOT, 'lib')
export const SITE_DIST_DIR = join(ROOT, 'site')
export const CONFIG_FILE = join(ROOT, CONFIG_FILE_NAME)
export const PACKAGE_JSON_FILE = join(ROOT, 'package.json')
export const ROOT_WEBPACK_CONFIG_FILE = join(ROOT, 'webpack.config.js')
export const ROOT_POSTCSS_CONFIG_FILE = join(ROOT, 'postcss.config.js')
export const CACHE_DIR = join(ROOT, 'node_modules/.cache')

// 默认路径
export const DIST_DIR = join(__dirname, '../../dist')
export const CONFIG_DIR = join(__dirname, '../config')

// Config files
export const BABEL_CONFIG_FILE = join(CONFIG_DIR, 'babel.config.js')
export const POSTCSS_CONFIG_FILE = join(CONFIG_DIR, 'postcss.config.js')

// 文件类型
export const SCRIPT_EXTS = ['.tsx', '.jsx', '.ts', '.js', '.vue']
export const STYLE_EXTS = ['.less', '.css']
export const ENTRY_EXTS = SCRIPT_EXTS

// 没有缓存的引入依赖
export function requireNoCache(filepath: string) {
  delete require.cache[filepath]
  return require(filepath)
}

// 获取package.json
export function getPackageJson() {
  return requireNoCache(PACKAGE_JSON_FILE)
}

// 获取配置文件
export function getConfig() {
  try {
    return requireNoCache(CONFIG_FILE)
  } catch (err) {
    return {}
  }
}

// 获取源码路径，默认为src
function getSrcDir() {
  const config = getConfig()
  const srcDir = get(config, 'build.src')

  if (srcDir) {
    if (isAbsolute(srcDir)) {
      return srcDir
    }

    return join(ROOT, srcDir)
  }

  return join(ROOT, 'src')
}
export const SRC_DIR = getSrcDir()

// 获取css语言，默认为src
function getCssLang() {
  const config = getConfig()
  const cssLang = get(config, 'build.css.preprocessor')

  if (cssLang) {
    return cssLang
  }

  return 'less'
}
export const CSS_LANG = getCssLang()

// 获取框架类型
function getFramework() {
  const config = getConfig()
  const framework = get(config, 'build.framework')

  return framework
}
export const FRAMEWORk = getFramework()
// 源码样式路径
export const STYLE_DIR = join(SRC_DIR, 'style')
