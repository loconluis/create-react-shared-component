const createPackageJSON = ({ projectName }) => ({
  name: 'package.json',
  content: `{
"name": "${projectName}",
"description": "My REACT component to publish on NPM",
"version": "0.1.0",
"main": "build/index.js",
"author": {
  "name": "",
  "email": ""
},
"scripts": {
  "start": "webpack --watch",
  "build": "webpack -p"
},
"babel": {
  "presets": ["env"],
  "plugins": [
    "transform-object-rest-spread",
    "transform-react-jsx",
    "transform-class-properties"
  ]
},
"standard": {
  "parser": "babel-eslint"
},
"homepage": "",
"repository": {
  "type": "git",
  "url": ""
},
"license": "MIT"
}`
})

module.exports = createPackageJSON
