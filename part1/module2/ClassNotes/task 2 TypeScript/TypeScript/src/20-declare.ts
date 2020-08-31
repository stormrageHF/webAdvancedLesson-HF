// 声明

// 有一些库可能没有 ts 类型声明，所以我们可以在用以前手动声明一下

import { camelCase } from 'lodash'

// 所以这里可以手动声明
// declare function camelCase(inur: string): string

// 也可以下载 lodash 自己的声明模块来解决这个问题 npm install @types/lodash -D

const res = camelCase('hello type')
console.log(res); // helloType
