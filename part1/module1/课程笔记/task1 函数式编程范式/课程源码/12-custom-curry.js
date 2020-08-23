// 自定义柯里化函数

const curry = (func) => {
  return function curried(...args) {

    console.log(args); // [ 1, 2 ]  数组
    console.log(...args); // 1 2  类数组参数
    console.log(func.length); // 3 这个属性 length 代表就是函数得参数个数

    if (args.length < func.length) {
      return function (...cargs) {
        return curried(...args, ...cargs) // 递归 es6 直接拼接参数
      }
    }
    return func(...args)
  }
}

function getSum(a, b, c) {
  return a + b + c;
}
const cc = curry(getSum)
// cc(1,2)
console.log(cc(4)(5)(6)); // 15
// console.log(cc(4,5)(6)); // 15

{
  // 以下是教程里得写法
  const curry2 = (func) => {
    return function curried(...args) {
      if (args.length < func.length) {
        return function () {
          return curried(...args.concat(Array.from(arguments)))
        }
      }
      return func(...args)
    }
  }
  const csc = curry2(getSum)
  console.log(csc(7)(8,9)); // 24

}

// 总结： 闭包 + 递归