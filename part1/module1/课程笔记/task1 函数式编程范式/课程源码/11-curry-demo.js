// 柯里化得案例

// 匹配数组中得带空格得元素

// 1. 首先，如何判断 str 中是否有空格
{
  const r = "1 2 4".match(/\s+/g)
  console.log(r); // [ ' ', ' ' ]
  // match 把str中满足匹配条件得字符返回
}

// 我们可以柯里化一个纯函数
const _ = require('lodash')

// 2. 创建一个匹配字符串得纯函数,并对他进行柯里化
const match = _.curry(function (reg, str) {
  return str.match(reg)
})

// 我们可以获取两个纯函数，一个是判断是否空字符，一个是判断是否有数字,参数都是string
const haveSpace = match(/\s+/g);
const haveNumber = match(/\d+/g);

//测试
{
  console.log(haveSpace('hello world')); // [ ' ' ]
  console.log(haveSpace('hello')); // null 

  console.log(haveNumber('123abc')); // [ '123' ]
  console.log(haveNumber('abc')); // null

  const str = 'hello wrold'
  console.log(haveSpace(str)); // [ ' ' ]
  console.log(haveSpace(str)); // [ ' ' ]
  console.log(haveSpace(str)); // [ ' ' ]

}


// 3. 我们可以用数组得filter函数进行柯里化封装，filter本身返回一个新数组，不改原数组，所以是纯函数
// 这里有个技巧，就是纯函数当作参数传进另一个函数，那这个函数就是个纯函数
const filter = _.curry(function (func, array) {
  return array.filter(func)
})

// 我们可以得到一个纯函数，只需要传参 数组 就可以获取它得匹配成员,(注意数组成员必须都是string)
const findSpace = filter(haveSpace)

// 测试
{
  // const arr = ['abc', 'a b', '123 bbb', 123] // 这里成员不能有非 str， 毕竟核心判断是 match，否则会报错 TypeError: str.match is not a function
  const arr = ['abc', 'a b', '123 bbb']
  const r = findSpace(arr)
  console.log(r); // [ 'a b', '123 bbb' ]
}



