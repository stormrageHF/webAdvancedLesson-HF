// task 异步处理任务

const { task } = require('folktale/concurrency/task')
const { find, split } = require('lodash/fp')
const fs = require('fs')

// 异步读取 package.json 文件

// 返回一个 task 函子
function readFile(fileName) {
  return task(function (resolver) {
    fs.readFile(fileName, 'utf-8', (err, data) => {
      if (err) resolver.reject(err)

      resolver.resolve(data)
    })
  })
}

const r = readFile('函子/package.json') // 只是返回 task 函子 并未执行读取函数
  .map(split('\n')) // map 必须在 run 前

  .map(find(x => x.includes('version'))) //   "version": "1.0.0",

  .run() // 开始执行读取函数 map 虽然在前面但是第一步还是 run
  // .map(split('\n')) // TypeError: readFile(...).run(...).map is not a function

  .listen({ // 前面执行各种函数后得响应结果
    onRejected: err => {
      console.log(err);
    },
    onResolved: data => {
      console.log('下面是 task 结果');
      console.log(data);
    }
  })
console.log(r);

