import { ConfigAPI } from '@babel/core'
import { isVue } from '../common'

module.exports = function (api?: ConfigAPI) {
  if (api) {
    // Do not cache this config, and re-execute the function every time.
    api.cache.never()
  }

  const { MODULE_ENV } = process.env

  const useESModules = MODULE_ENV !== 'commonjs'

  const config = {
    presets: [
      [
        '@babel/preset-env',
        {
          loose: true,
          modules: useESModules ? false : 'commonjs'
        }
      ],
      '@babel/preset-typescript'
    ],
    plugins: [
      [
        '@babel/plugin-transform-runtime',
        {
          corejs: false,
          useESModules
        }
      ],
      '@babel/plugin-transform-object-assign'
    ]
  }

  if (isVue) {
    config.plugins.push('@vue/babel-plugin-jsx')
  }

  return config
}
