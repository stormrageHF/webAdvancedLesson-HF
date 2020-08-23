/*
柯里化函数
*/

const _ = require('lodash')

function func(a, b, c) {
  return a + b + c
}

const curried = _.curry(func)
/*
func 共需要三个参数，所以柯里化后得函数 curried
*/
console.log(curried(1)(2)(3)); // 6
console.log(curried(1,2)(3)); // 6
console.log(curried(1,2,3)); // 6




