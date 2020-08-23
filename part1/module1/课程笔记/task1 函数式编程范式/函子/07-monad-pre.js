// IO 函子问题

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
}

let readFile = function (filename) {
  return new IO(function () { // 返回得是一个 IO 函子对象
    return fs.readFileSync(filename, 'utf-8')
  })
}

let print = function (x) {
  return new IO(function () {
    console.log('print',x);
    return x;
  })
}

let cat = fp.flowRight(print, readFile)
// IO(IO(value))
let r = cat('函子/package.json')

console.log(r); // IO { _value: [Function (anonymous)] }

// r._value() // print IO { _value: [Function (anonymous)] } 这个执行了 print 里得 log， 输出得还是一个函子

console.log( r._value()._value()); // 输出 package.json 内容了

// _value()._value() 这种风格很蛋疼 需要改造