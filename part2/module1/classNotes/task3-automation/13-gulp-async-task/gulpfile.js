const fs = require('fs')

exports.callback = done => {
  console.log('callback task~');
  done()
}

// 返回错误 会使后序任务停止
exports.callback_error = done => {
  console.log('callback task~');
  done(new Error('task failed!'))
}

// promise
exports.promise = () => {
  console.log('promise task~');
  return Promise.resolve()
}

// promise 失败
exports.promise_error = () => {
  console.log('promise task~');
  return Promise.reject(new Error('task failed~'))
}


// async promise语法糖
const timeout = time => {
  return new Promise(resolve => {
    setTimeout(resolve, time)
  })
}

exports.async = async () => {
  await timeout(1000)
  console.log('async task~');
}

// stream

// exports.stream = () => {
//   const readStream = fs.createReadStream('package.json')
//   const writeStram = fs.createWriteStream('temp.txt')
//   readStream.pipe(writeStram)
//   return readStream
// }

exports.stream = done => {
  const readStream = fs.createReadStream('package.json')
  const writeStram = fs.createWriteStream('temp.txt')
  readStream.pipe(writeStram)
  readStream.on('end', ()=>{
    done()
  })
}



