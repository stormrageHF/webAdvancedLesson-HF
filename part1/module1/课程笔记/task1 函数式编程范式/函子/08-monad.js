// Monad 函子 
/*
使用场景：解决嵌套函子得问题 IO(IO())
*/

const fp = require('lodash/fp')
const fs = require('fs')

class IO {
  static of(value) {
    return new IO(() => {
      return value
    })
  }

  constructor(fn) {
    this._value = fn;
  }

  map(fn) {
    // 和其他Functor得区别
    return new IO(fp.flowRight(fn, this._value)) // 函数组合
  }

  join() {
    return this._value()
  }

  flatMap(fn) {
    return this.map(fn).join()
  }
}

let readFile = function (filename) {
  return new IO(function () { // 返回得是一个 IO 函子对象
    return fs.readFileSync(filename, 'utf-8')
  })
}

let print = function (x) {
  return new IO(function () {
    console.log('print', x);
    return x;
  })
}

let r = readFile('函子/package.json') // 返回第一个IO函子
  .map(fp.toUpper) // 全部转大写
  .flatMap(print) // 把读取文件得函数和print函数合并，返回第二个IO函子,并且执行 join方法（也就是调用了组合方法），返回一个新得 IO 函子
  .join() // 执行第最后一个 IO 函子里得 _value() 方法


// console.log(r);