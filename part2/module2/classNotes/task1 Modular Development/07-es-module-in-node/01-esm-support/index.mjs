import { foo } from './module.mjs'

console.log(foo);

// 导入原生模块
// import fs from 'fs'
// fs.writeFileSync('./foo.txt', 'hello world')

// 导入原生模块得内部方法
import { writeFileSync } from 'fs'
writeFileSync('./bar.txt', 'bar bar bar ')

// 导入三方模块
import _ from 'lodash'
console.log(_.camelCase('es module')); // esModule

// 导入三方模块中内部变量
// import { camelCase } from 'lodash' 
// SyntaxError: The requested module 'lodash' does not provide an export named 'camelCase'
