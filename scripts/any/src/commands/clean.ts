import { remove } from 'fs-extra'
import { ES_DIR, LIB_DIR, DIST_DIR } from '../common/constant'
import { consola } from '../common/logger'

export async function clean() {
  await Promise.all([remove(ES_DIR), remove(LIB_DIR), remove(DIST_DIR)])
  consola.success('Clean ok')
}
