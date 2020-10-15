import { getPostcssConfig } from '../common/css'

type PostcssConfig = object & {
  plugins?: object
}

function mergePostcssConfig(config1: PostcssConfig, config2: PostcssConfig) {
  const plugins = {
    ...config1.plugins,
    ...config2.plugins
  }

  return {
    ...config1,
    ...config2,
    plugins
  }
}

const DEFAULT_CONFIG = {
  plugins: {
    autoprefixer: {}
  }
}

module.exports = mergePostcssConfig(DEFAULT_CONFIG, getPostcssConfig())
