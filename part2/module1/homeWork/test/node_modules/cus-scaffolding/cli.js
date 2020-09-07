#!/usr/bin/env node

const inquirer = require('inquirer')
const path = require('path')
const fs = require('fs')
const ejs = require('ejs')


inquirer.prompt([
  {
    type: 'input',
    name: 'name',
    message: 'project name ?',
  }
]).then(anwsers => {
  const tmpl = path.join(__dirname, 'templates')
  const dest = process.cwd()

  fs.readdir(tmpl, (err, files) => {
    if (err) throw err
    files.forEach(file => {
      ejs.renderFile(path.join(tmpl, file), anwsers, (err, result) => {
        if (err) throw err
        fs.writeFileSync(path.join(dest, file), result)
      })
    })
  })
})