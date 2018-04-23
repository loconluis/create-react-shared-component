// Used imports
const shell = require('shelljs')
const chalk = require('chalk')
const colors = require('yargonaut').chalk()
const yargs = require('yargs')
// node lib to write (File System)
const fs = require('fs')
// get all the templates
let template = require('./templates')
let packageJSON = require('./templates/packageJSON')
// get the name of the project by argument on the console
const projectName = process.argv[2]
// config to the CLI when they write help
const argv = yargs /* standard disabled line */
  .usage(`Usage:\n $0 ${colors.green('[project-name]')}`)
  .example('$0 shareableComponent')
  .epilog(`Made with ❤️  by @LoconLuis | Usage above, more information check the repo: ${colors.blue('https://github.com/loconluis/create-react-components')}`)
  .help('h')
  .alias('h', 'help')
  .argv
// create the new directory with the project-name
const createDirectory = () => {
  return new Promise(resolve => {
    if (projectName) {
      shell.exec(`mkdir ${process.argv[2]}`, (code) => {
        console.log('code', code)
        console.log(`${chalk.green('Creating Project...')}`)
        resolve(true)
      })
    } else {
      console.log(chalk.red('\n No project name was provided \n'))
      console.log(chalk.red('\n For more information on how to use this CLI, use the command --help \n'))
      resolve(false)
    }
  })
}
// return the directory to make moves here
const cdIntoDirectory = () => {
  return new Promise(resolve => {
    shell.cd(projectName)
    resolve()
  })
}
// make an array of the files
const getAnArrayFiles = () => {
  let files = []
  Object.keys(template).forEach(el => {
    console.log('el', el)
    files.push(template[el])
  })
  // push the packageJSON
  files.push(packageJSON(projectName))

  return files
}
// write all the files
const writeFiles = (files) => {
  // shell.exec('mkdir src')
  // let theNewPackageJSON = packageJSON(projectName)
  // files.map()
}
// trigger function to exec all
const Trigger = async () => {
  // await createDirectory()
  // await cdIntoDirectory()

  console.log(JSON.stringify(getAnArrayFiles(), undefined, 2))
}

Trigger()
