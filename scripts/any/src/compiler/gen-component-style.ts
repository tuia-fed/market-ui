import { existsSync, outputFileSync, readFileSync } from 'fs-extra'
import { join, relative, sep } from 'path'
import { getComponents, replaceExt } from '../common'
import {
  CSS_LANG,
  ENTRY_EXTS,
  ES_DIR,
  LIB_DIR,
  SRC_DIR
} from '../common/constant'
import { getCssBaseFile, isComponentCssExisted } from '../common/css'

const IMPORT_RE = /import\s+?(?:(?:(?:[\w*\s{},]*)\s+from\s+?)|)(?:(?:".*?")|(?:'.*?'))[\s]*?(?:;|$|)/g

// 找到代码中的依赖导入语句
export function matchImports(code: string) {
  return code.match(IMPORT_RE) || []
}

// 根据依赖路径，找到依赖的实际文件路径
function fillExt(filePath: string) {
  for (let i = 0; i < ENTRY_EXTS.length; i++) {
    const completePath = `${filePath}${ENTRY_EXTS[i]}`
    if (existsSync(completePath)) {
      return completePath
    }
  }

  for (let i = 0; i < ENTRY_EXTS.length; i++) {
    const completePath = `${filePath}/index${ENTRY_EXTS[i]}`
    if (existsSync(completePath)) {
      return completePath
    }
  }

  return ''
}

// 根据依赖导入语句，获取依赖的完整路径
export function getPathByImport(code: string, filePath: string) {
  const divider = code.includes('"') ? '"' : "'"
  const relativePath = code.split(divider)[1]

  if (relativePath.includes('.')) {
    return fillExt(join(filePath, '..', relativePath))
  }

  return null
}

type DepsMap = Record<string, string[]>

// 依赖关系缓存
let depsMap: DepsMap = {}

// 找到当前文件的直接依赖
export function getDeps(filepath: string) {
  if (depsMap[filepath]) return depsMap[filepath]

  const code = readFileSync(filepath, 'utf-8')
  const imports = matchImports(code)

  const paths = imports
    .map(code => getPathByImport(code, filepath))
    .filter(item => !!item) as string[]

  depsMap[filepath] = paths

  paths.forEach(getDeps)

  return paths
}

// 清空依赖
export function clearDepsCache() {
  depsMap = {}
}

// 获取样式文件路径
function getStyleRelativePath(component: string, dep: string, ext: string) {
  return relative(join(ES_DIR, `${component}/style`), getPath(dep, ext))
}

// 获取组件在ES的样式入口路径
function getPath(component: string, ext: string) {
  return join(ES_DIR, `${component}/index${ext}`)
}

// 判断这个路径是不是这个组件，为什么这么麻烦呢？
function matchPath(path: string, component: string): boolean {
  const p = relative(SRC_DIR, path)
  const arr = p.split(sep)
  return arr.includes(component)
}

// 分析组件的依赖
export function analyzeComponentDeps(components: string[], component: string) {
  const record = new Set()
  const componentEntry = fillExt(join(SRC_DIR, component, 'index'))
  const deps: string[] = []

  function search(filepath: string) {
    record.add(filepath)

    getDeps(filepath).forEach(key => {
      if (record.has(key)) return

      search(key)

      components
        // 找出当前路径的组件
        .filter(item => matchPath(key, item))
        // 其实是一个只有一项的数组，为什么要用数组呢
        .forEach(item => {
          // 依赖中不存在，且不是自身
          if (!deps.includes(item) && item !== component) {
            deps.push(item)
          }
        })
    })
  }

  search(componentEntry)

  return deps
}

let dpsMap: DepsMap = {}

// 生成所有组件的依赖
function genDepsMap(components: string[]) {
  components.forEach(componnet => {
    dpsMap[componnet] = analyzeComponentDeps(components, componnet)
  })
}

// 获取组件的依赖
function getComponentDeps(componnet: string) {
  return dpsMap[componnet]
}

// 两种类型的CSS入口
const OUTPUT_CONFIG = [
  {
    dir: ES_DIR,
    template: (dep: string) => `import '${dep}';`
  },
  {
    dir: LIB_DIR,
    template: (dep: string) => `require('${dep}');`
  }
]

// 根据依赖，找到样式依赖
function getComponentStyleDeps(deps: string[], component: string) {
  const styleDeps: string[] = []

  deps.forEach(dep => {
    if (isComponentCssExisted(dep)) {
      styleDeps.push(dep)
    }
  })

  return styleDeps
}

// 生成入口文件
function genEntry(props: {
  basefile: string
  component: string
  filename: string
  ext: string
}) {
  const { basefile, component, filename, ext } = props
  const deps = getComponentDeps(component)
  const styleDeps = getComponentStyleDeps(deps, component)
  const styleDepsPath = styleDeps.map(dep =>
    getStyleRelativePath(component, dep, ext)
  )

  OUTPUT_CONFIG.forEach(({ dir, template }) => {
    const outputDir = join(dir, component, 'style')
    const outputFile = join(outputDir, filename)

    let content = ''

    // 引入公共样式
    if (basefile) {
      const targetBasefile = replaceExt(basefile.replace(SRC_DIR, dir), ext)
      content += template(relative(outputDir, targetBasefile))
      content += '\n'
    }
    // 引入依赖组件的样式
    content += styleDepsPath.map(template).join('\n')
    // 引入自己的样式
    content += '\n'
    content += template('../index' + ext)
    // window上
    content = content.replace(new RegExp('\\' + sep, 'g'), '/')

    outputFileSync(outputFile, content)
  })
}

/**
 * 生成所有组件的样式入口
 */
export function genComponentStyle() {
  // 获取所有组件
  const components = getComponents()
  // 生成组件的依赖
  genDepsMap(components)
  // 组件是否有基础样式文件
  const basefile = getCssBaseFile()

  // 遍历组件生成对应的样式入口
  components.forEach(component => {
    genEntry({
      basefile,
      component,
      filename: 'index.js',
      ext: '.css'
    })

    if (CSS_LANG !== 'css') {
      genEntry({
        basefile,
        component,
        filename: CSS_LANG + '.js',
        ext: '.' + CSS_LANG
      })
    }
  })
}
