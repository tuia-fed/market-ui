module.exports = {
  hooks: {
    'pre-commit': 'npm run prettier && npm run stylelint',
    'commit-msg': 'commitlint -E HUSKY_GIT_PARAMS'
  }
}