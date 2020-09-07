// 默认任务
const fs = require('fs')
const { Transform } = require('stream')
const { log } = require('console')

exports.default = () => {
  // 文件读取流
  const read = fs.createReadStream('normalize.css')
  // 文件写入流
  const write = fs.createWriteStream('normalize.min.css')
  // 文件转换流
  const transform = new Transform({
    transform: (chunk, encoding, callback) => {
      // 核心转换实现
      // chunk --- 读取流中的读取内容 buffer
      const input = chunk.toString()
      // 去掉所有空格和注释
      const output = input.replace(/\s+/g, '').replace(/\/\*.+?\*\//g, '')
      // 执行回调函数 错误优先 
      callback(null, output)
    }
  })


  // 把读取出来的文件导入写入文件的流
  read
    .pipe(transform) // 转换
    .pipe(write) // 写入

  return read
}