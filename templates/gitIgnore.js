const gitIgnore = {
  name: '.gitignore',
  content: `
    /node_modules
    # Visual Studio Code - https://code.visualstudio.com/
    .settings/
    .vscode/
    ### macOS ###
    *.DS_Store
    .AppleDouble
  `
}

module.exports = gitIgnore
