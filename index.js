#! /usr/local/bin/node

const fs = require('fs')
const shell = require('shelljs')
const chalk = require('chalk')
const yargs = require('yargs')
const Ora = require('ora')
const spinner = new Ora({ color: 'yellow' })

// Get all the templates
// function to create a packageJSON with the projectName
const templates = require('./templates')
// get all the array with dependencies
const { dependencies, devDependencies } = require('./dependencies')

const depCommand = {
  'devDependencies': '-D',
  'dependencies': '-S'
}

// config to the CLI when they write help
const argv = yargs
  .usage(`Usage:\n $0 ${chalk.green('[project-name]')}`)
  .demand(1, 'Expecting the project name')
  .example('$0 shareableComponent')
  .epilog(`Made with ❤️  by @LoconLuis | Usage above, more information check the repo: ${chalk.blue('https://github.com/loconluis/create-react-shared-component')}`)
  .help('h')
  .alias('h', 'help')
  .argv

// Get the name of the project by argument on the console
const projectName = argv._[0] // Project index within the _ array of Yargs.

// create the new directory with the project-name
const createDirectory = () => {
  if (shell.exec(`mkdir ${projectName}`).code !== 0) {
    throw new Error('File with the same name exist.')
  }
  console.log(chalk.green(`\n Creating a directory for > ${projectName}...\n`))
}

// return the directory to make moves here
const cdIntoDirectory = () => shell.cd(projectName)

// write all the files
const writeFiles = (files) => {
  shell.exec('mkdir src')
  console.log('\n Writing some files 📝 \n')
  files.forEach(file => fs.writeFileSync(file.name, file.content))
}

// Install dependencies, and devDependencies
function installDeps (type, list) {
  return new Promise((resolve, reject) => {
    spinner.start(`Time for ${type} 🙏🏼 `)
    shell.exec(`npm i ${depCommand[type]} ${list.join(' ')}`, (code, stdout, stderr) => {
      spinner.stop()
      if (code !== 0) {
        reject(new Error(`Something went wrong installing deps: ${stderr}`))
      }
      spinner.succeed(`Nice! ${type} are installed! 🤓`)
      resolve()
    })
  })
}

// write the last logs for the app UI
const lastLogs = () => {
  console.log(chalk.yellow(`\n Yes, the project is ready.`))
  console.log(chalk.yellow(`\n Time to use:\n`))
  console.log('>>> ', chalk.bgCyan(chalk.black(`cd ${projectName}`)))
  console.log(chalk.yellow(`\nTo start run:\n`))
  console.log('>>> ', chalk.bgCyan(chalk.black('npm start')))
  console.log(chalk.yellow(`\nGo to:\n`))
  console.log('>>> ', chalk.bgCyan(chalk.black('src/index.js')))
  console.log(chalk.yellow(`\nAnd  start coding 👨🏻‍💻. \n`))
}

// main function to exec all
(async function main () {
  console.time('create-react-shared-component')
  try {
    // mkdir and cd $_
    createDirectory()
    cdIntoDirectory()
    // write templates to folder
    writeFiles(templates(projectName))
    // waiting to install packages
    console.log(chalk.green('\nHere we go..... ⚡️ \n'))
    await installDeps('dependencies', dependencies)
    console.log(chalk.green('\nJust a few more seconds ✌🏼 \n'))
    await installDeps('devDependencies', devDependencies)
    // finish
    lastLogs()
  } catch (e) {
    spinner.stop()
    console.error(chalk.red(e))
  } finally {
    console.timeEnd('create-react-shared-component')
  }
})()
