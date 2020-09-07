#!/usr/bin/env node

// Node CLI 应用入口文件必须要有这样的文件头
// 如果是Linux或者macOS系统下还需要修改此文件的读写权限为755
// 具体就是通过 chmod 755 cli.js 实现修改

// 脚手架的工作过程
// 1. 通过命令行交互询问用户问题
// 2. 根据用户回答结果生成文件

// console.log('cli working');

const inquirer = require('inquirer')
const fs = require("fs")
const path = require('path')
const ejs = require('ejs')

inquirer.prompt([
  {
    type: "input",
    name: "name",
    message: "Project name ?"
  }
]).then(anwsers => {
  // console.log(anwsers);
  // 根据用户的回答结果生成文件

  // 摸板目录
  const tmpDir = path.join(__dirname, 'templates')
  // 目标目录
  const destDir = process.cwd()

  // 将模板下的文件全部转换到目标目录
  fs.readdir(tmpDir, (err, files) => {
    if (err) throw err
    files.forEach(file => {
      // console.log(file);
      // 通过模板引擎渲染文件
      ejs.renderFile(path.join(tmpDir, file), anwsers, (err, result) => {
        if (err) throw err
        // console.log(result);
        // 将结果写入目标目录
        fs.writeFileSync(path.join(destDir, file), result)
      })
    })
  })
})



