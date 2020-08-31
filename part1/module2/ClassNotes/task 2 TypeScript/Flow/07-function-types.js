/**
 * 回调函数做类型限制
 * @flow
 */

// 回调函数参数有两个，一个string类型 一个number类型，返回值是undefined
function foo(callback: (string, number) => void) {
  callback('100', 10)
}

// 不可以有返回值
foo(function (str, num) {
  console.log(str)
  console.log(num)
})

