import { readFileSync } from 'fs-extra'
import { render } from 'less'

// todo：支持less文件中的 @import 路径为绝对路径
export async function compileLess(filepath: string) {
  const source = readFileSync(filepath, 'utf-8')

  const { css } = await render(source, {
    filename: filepath
  })

  return css
}
