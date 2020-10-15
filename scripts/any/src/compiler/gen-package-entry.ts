import { outputFileSync } from 'fs-extra'
import { join, relative } from 'path'
import { getComponents, pascalize } from '../common'
import { getPackageJson, SRC_DIR } from '../common/constant'

function genImport(component: string) {
  return `import ${pascalize(component)} from "./${relative(
    SRC_DIR,
    join(SRC_DIR, component)
  )}"`
}

function genImports(components: string[]) {
  let content = ''
  components.forEach(component => {
    content += genImport(component)
    content += '\n'
  })

  return content
}

export function genPackageEntry({ output }: { output: string }) {
  const components = getComponents()
  const pkg = getPackageJson() as { version: string }
  const names = components.map(pascalize)
  const version = pkg.version

  let content = ''

  // 构造入口文件内容
  content += `
${genImports(components)}

const version = "${version}"

function install(app) {
  const components = [
  ${names.join(',\n  ')}
  ]
  
  components.forEach(component => {
    if (component.install) {
      app.use(component)
    } else if (component.name) {
      app.component(component.name, component)
    }
  })
}

export {
  version,
  install,
  ${names.join(',\n  ')}
}

export default {
  version,
  install
}
`
  outputFileSync(output, content)
}
