module.exports = {
  hooks: {
    // 'pre-commit': 'npm run stylelintt && npm run eslintt',
    'commit-msg': 'commitlint -E HUSKY_GIT_PARAMS'
  }
}