const path = require('path')

const MD_RE = /\.(md)$/

function isMd(path) {
  return MD_RE.test(path)
}

function resolvePath(dir) {
  return path.resolve(__dirname, dir)
}

module.exports = {
  isMd,
  resolvePath
}
