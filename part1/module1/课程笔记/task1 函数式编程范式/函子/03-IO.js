
const fp = require('lodash/fp')

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

// 传入 node 进程对象
const r = IO.of(process)
  .map(p => p.execPath)

console.log(r); // IO { _value: [Function (anonymous)] }
console.log(r._value()); // D:\nodejs\node.exe  这里就是调用得时候，一些不纯得操作在这里执行
