// 自定义 flowRight
/*
参数：多个函数对象
返回值：一个函数
*/

const reverse = array => array.reverse()
const first = array => array[0]
const toUpper = str => str.toUpperCase()

// 第一种写法
// const flowRight = (...args) => {
//   return (value) => {
//     return args.reverse().reduce((acc, fn) => {
//       return fn(acc)
//     }, value)
//   }
// }

// 第二种写法
// const flowRight = (...args) => (value => (args.reverse().reduce((acc, fn) => fn(acc), value)))

const flowRight = (...args) => value => args.reverse().reduce((acc, fn) => fn(acc), value)

const f = flowRight(toUpper, first, reverse)
const arr = ['aaa', 'bbb', 'ccc']
console.log(f(arr)); // CCC

