import { outputFileSync } from 'fs-extra'
import { join, relative } from 'path'
import { getComponents } from '../common'
import { CSS_LANG, SRC_DIR } from '../common/constant'
import { getCssBaseFile, isComponentCssExisted } from '../common/css'

function template(name: string) {
  return `@import "./${name}";`
}

export function genPackageStyle({ output }: { output: string }) {
  const components = getComponents()
  // 组件是否有基础样式文件
  const basefile = getCssBaseFile()

  let content = ''

  // 引入公共样式
  if (basefile) {
    content += template(relative(SRC_DIR, basefile))
    content += '\n'
  }

  content += components
    .map(component => {
      if (!isComponentCssExisted(component)) {
        return ''
      }

      return template(
        relative(SRC_DIR, join(SRC_DIR, `${component}/index.${CSS_LANG}`))
      )
    })
    .filter(item => !!item)
    .join('\n')

  outputFileSync(output, content)
}
