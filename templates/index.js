const appTemplate = require('./App')
const esLintTemplate = require('./esLint')
const npmIgnoreTemplate = require('./npmIgnore')
const gitIgnoreTemplate = require('./gitIgnore')
const pkg = require('./packageJSON')
const webpackTemplate = require('./webpackConfig')

module.exports = (projectName) => [
  appTemplate,
  esLintTemplate,
  npmIgnoreTemplate,
  gitIgnoreTemplate,
  webpackTemplate,
  pkg({ projectName })
];
