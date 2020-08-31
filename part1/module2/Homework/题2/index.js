// 解释最终执行结果

var tmp = 123;
if (true) {
  console.log(tmp);
  let tmp
}

/*
console.log(tmp) 会报错 ReferenceError: Cannot access 'tmp' before initialization

原因：
暂时性死区：
ES6 明确规定，代码块内如果存在 let 或者 const，代码块会对这些命令声明的变量从块的开始就形成一个封闭作用域。代码块内，在声明变量 PI 之前使用它会报错。

if 语句这里有let声明，这里的块级作用域形成封闭作用域，又因为let 声明在 console.log之后，且不会变量提升，所以报错

如果将 let tmp 写在 console之前，则会输出 undefined
*/


