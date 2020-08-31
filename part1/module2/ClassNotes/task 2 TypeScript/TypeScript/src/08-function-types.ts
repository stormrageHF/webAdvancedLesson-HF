//  函数类型

export { }
/*
a 正常参数
b 可选参数 ？
c 默认参数
*/
function foo(a: number, b?: number, c: number = 10): string {
  console.log(b);
  return 'foo'
}

foo(100, undefined, 11) // undefined

// :(a: number, b: number) => string 可以自动识别
const bar = function (a: number, b: number): string {
  return 'bar'
}

// 手动指定
const coo: (a: number, b: number) => string = function (a: number, b: number): string {
  return 'coo'
}


