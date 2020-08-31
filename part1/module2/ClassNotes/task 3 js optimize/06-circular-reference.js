// 循环引用

function foo () {
  const obj1 = {}
  const obj2 = {}

  obj1.name = obj2
  obj2.name = obj1

}

foo()

/*
函数执行完毕，内部的变量因为互相引用导致计数不为 0 无法被释放
*/





