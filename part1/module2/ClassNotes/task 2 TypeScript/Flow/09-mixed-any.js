/**
 * 任意类型
 * @flow
 */

// mixed 可以传入任意类型
function passMixed(value: mixed) {
  // value * value //会报错
  if (typeof value === 'number') { // 必须先判断类型
    value * value
  }
}

passMixed(1)

// any 也是任意类型
function passAny(value: any) {
  value * value
}

/*

区别：
 虽然都是任意类型，但是 mixed 是强类型的，any 是弱类型的
 比如 mixed 修饰的参数value是一个string，在函数内部要当成字符串处理的时候，你必须先判断类型才能做处理，否则会报语法错误
 any 就不会，any报错的地方是在执行的时候
 
*/

















