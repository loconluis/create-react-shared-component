const createPackageJSON = (nameProject) => {
  return `
    {
      "name": "${nameProject}",
      "description": "My REACT component to publish on NPM",
      "version": "0.1.0",
      "main": "build/index.js",
      author: {
        name: "",
        email: ""
      },
      "babel": {
        "presets": ["env"],
        "plugins": [
          "transform-object-rest-spread",
          "transform-react-jsx",
          "transform-class-properties",
          "emotion"
        ]
      },
      "standard": {
        "parser": "babel-eslint"
      },
      "devDependencies": {
        "babel-cli": "^6.26.0",
        "babel-core": "^6.26.0",
        "babel-eslint": "^8.2.2",
        "babel-loader": "^7.1.4",
        "babel-plugin-transform-class-properties": "^6.24.1",
        "babel-plugin-transform-object-rest-spread": "^6.26.0",
        "babel-plugin-transform-react-jsx": "^6.24.1",
        "babel-preset-env": "^1.6.1",
        "eslint": "^4.19.0",
        "eslint-config-standard": "^11.0.0",
        "eslint-config-standard-react": "^6.0.0",
        "eslint-plugin-import": "^2.9.0",
        "eslint-plugin-node": "^6.0.1",
        "eslint-plugin-promise": "^3.7.0",
        "eslint-plugin-react": "^7.7.0",
        "eslint-plugin-standard": "^3.0.1",
        "webpack-cli": "^2.0.11"
      },
      "homepage": "",
      "repository": {
        "type": "git",
        "url": ""
      },
      "license": "MIT"
    }`
}

module.exports = createPackageJSON
