import { emptyDir } from 'fs-extra'
import { setNodeEnv } from '../common'
import { SITE_DIST_DIR } from '../common/constant'
import { compileSite } from '../compiler'

export async function dev(cmd: { watch?: boolean } = {}) {
  setNodeEnv('production')
  await emptyDir(SITE_DIST_DIR)
  await compileSite(false)
}
