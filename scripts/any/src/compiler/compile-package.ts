import webpack from 'webpack'
import { getPackageConfig } from '../config/webpack.package'

export async function compilePackage(isMinify: boolean) {
  return new Promise((resolve, reject) => {
    const config = getPackageConfig(isMinify)

    webpack(config, (err, stats) => {
      if (err || (stats && stats.hasErrors())) {
        reject()
      } else {
        resolve()
      }
    })
  })
}
