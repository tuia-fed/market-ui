import postcssrc from 'postcss-load-config'
import postcss from 'postcss'
import CleanCSS from 'clean-css'
import { POSTCSS_CONFIG_FILE } from '../common/constant'

export function getPostcssConfig() {
  return postcssrc.sync({}, POSTCSS_CONFIG_FILE) as { plugins: any[] }
}

export async function compileCss(source: string) {
  const config = getPostcssConfig()
  const { css } = await postcss(config.plugins).process(source, {
    from: undefined
  })

  return new CleanCSS().minify(css).styles
}
