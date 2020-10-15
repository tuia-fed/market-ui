import { join } from 'path'
import { LIB_DIR, ES_DIR, getConfig, CONFIG_DIR } from '../common/constant'
import { WebpackConfig } from '../common/types'
import MiniCssExtractPlugin from 'mini-css-extract-plugin'
import CssMinimizerPlugin from 'css-minimizer-webpack-plugin'
import TerserPlugin from 'terser-webpack-plugin'

export function getPackageConfig(isMinify: boolean): WebpackConfig {
  const { name } = getConfig()

  return {
    mode: 'production',
    entry: {
      [name]: join(ES_DIR, 'index.js')
    },
    output: {
      path: LIB_DIR,
      library: name,
      libraryTarget: 'umd',
      filename: '[name].min.js'
    },
    externals: {
      vue: {
        root: 'Vue',
        commonjs: 'vue',
        commonjs2: 'vue',
        amd: 'vue'
      }
    },
    module: {
      rules: [
        {
          test: /.(c|le)ss$/,
          use: [
            {
              loader: MiniCssExtractPlugin.loader,
              options: {
                esModule: false
              }
            },
            'css-loader',
            {
              loader: 'postcss-loader',
              options: {
                postcssOptions: {
                  config: join(CONFIG_DIR, 'postcss.config.js')
                }
              }
            }
          ]
        }
      ]
    },
    optimization: {
      minimize: isMinify,
      /**@ts-ignore */
      minimizer: [new TerserPlugin(), new CssMinimizerPlugin()]
    },
    plugins: [
      /**@ts-ignore */
      new MiniCssExtractPlugin({
        filename: '[name].min.css'
      })
    ]
  }
}
