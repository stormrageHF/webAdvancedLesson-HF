// 数组解构

const arr = [123, 456, 789]

{
  const [a, b, c] = arr
  console.log(a); // 123
  console.log(b); // 456
  console.log(c); // 789
}

{
  const [, , c] = arr
  console.log(c); // 789
}

{
  const [a,b,c,d] = arr
  console.log(d); // undefined
}

{
  const [a] = arr
  console.log(a); // 123
}

{
  // 默认值
  const [a,b,c = 'c',d = 'default',e = 'e'] = arr
  console.log(a); // 123
  console.log(b); // 456
  console.log(c); // 789
  console.log(d); // default
  console.log(e); // e
}

{
  // 剩余运算符...
  const [a, ...rest] = arr
  console.log(rest); // [ 456, 789 ]
}

{
  // 使用场景
// 分割路径
const path = 'learn/lesson1/js'
const [,l,]  = path.split('/') // 取中间的
console.log(l); // lesson1 
}

