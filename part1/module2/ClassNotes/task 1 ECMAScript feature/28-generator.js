// 生成器

function* foo() {
  console.log('11111');
  const r = yield 100 // 传值给 next1 ，被 next2 传值
  console.log(r); // test
  yield 200
  console.log('33333');
  yield 300
}

const g = foo()
console.log(g); // 生成器对象

const r = g.next() // next1
console.log(r); // { value: 100, done: false } 好像一个迭代器

g.next('test') // next2 

/*
yield 把参数传给外部的上一个 next 函数返回值
下一个 next 把参数传进 yield 返回值
*/