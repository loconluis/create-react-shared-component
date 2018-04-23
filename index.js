// node lib to write (File System)
const fs = require('fs')
// Used imports
const shell = require('shelljs')
const chalk = require('chalk')
const colors = require('yargonaut').chalk()
const yargs = require('yargs')
const Ora = require('ora')
const spinner = new Ora({ color: 'yellow' })
// get all the templates
let template = require('./templates')
// function to create a packageJSON with the projectName
let packageJSON = require('./templates/packageJSON')
// get all the array with dependencies
let { dependencies, devDependencies } = require('./dependencies')
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
      shell.exec(`mkdir ${projectName}}`, (code) => {
        console.log(`${chalk.green('\nCreating a directory for +' + projectName + '...\n')}`)
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
    files.push(template[el])
  })
  // push the packageJSON
  files.push(packageJSON(projectName))

  return files
}
// write all the files
const writeFiles = async (files) => {
  return new Promise(resolve => {
    shell.exec('mkdir src')
    spinner.start('Writing some files 📝')
    files.map(file => fs.writeFileSync(file.name, file.content, (err) => {
      if (err) throw err
    }))
    resolve()
  })
}
// Install dependencies, and devDependencies
const installDependencies = (dependenciesArray) => {
  return new Promise(resolve => {
    shell.exec(`npm i -S ${dependenciesArray.join(' ')}`, () => {
      spinner.succeed('Dependencies ready!')
      spinner.stop()
      resolve()
    })
  })
}
// Install dependencies, and devDependencies
const installDevdependencies = (devDependenciesArray) => {
  return new Promise(resolve => {
    shell.exec(`npm i -D ${devDependenciesArray.join(' ')}`, () => {
      spinner.succeed('Nice! DevDependencies are installed! 🤓')
      spinner.stop()
      resolve()
    })
  })
}
const lastLogs = () => {
  console.log(`\nYes, the project is ready.\n`)
  console.log(chalk.blue(`\ncd into ${projectName} directory\n`))
  console.log(chalk.blue(`\nrun npm start .\n`))
  console.log(chalk.yellow(`\nAnd start coding 👨🏻‍💻.\n`))
}
// trigger function to exec all
const Trigger = async () => {
  await createDirectory()
  if (projectName) {
    await cdIntoDirectory()
    const files = getAnArrayFiles()
    await writeFiles(files)
    // waiting to install packages
    console.log(chalk.green('\nIts comming...\n'))
    spinner.start('Installing dependencies 🌟')
    await installDependencies(dependencies)
    console.log(chalk.green('\nInstalling DevDependencies ✌🏼\n'))
    spinner.start('Time for devDependencies 🙏🏼')
    await installDevdependencies(devDependencies)
    lastLogs()
  }
}

Trigger()
