const esLintConfig = {
  name: '.eslintrc',
  content: `{
    "extends": ["standard", "standard-react"],
    "parser": "babel-eslint",
    "plugins": [
      "react"
    ]
  }`
}

module.exports = esLintConfig
