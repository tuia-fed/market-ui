module.exports = function() {
  if (process.env.BUILD_TARGET === 'package') {
    return {}
  }
}
