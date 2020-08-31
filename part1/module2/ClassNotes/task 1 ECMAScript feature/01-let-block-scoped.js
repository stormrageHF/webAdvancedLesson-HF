// 块级作用域

// for (var i = 0; i < 3; i++) {
//   for (var i = 0; i < 3; i++) {
//     console.log(i);
//   }
//   // 内部的 for 已经把 i 变成 3 了,所以只有一轮 0 1 2
//   console.log(i); // 3
// }

//------------------------------------------------------

// for (var i = 0; i < 3; i++) {
//   for (let i = 0; i < 3; i++) {
//     console.log(i);
//   }
// }
// // 三轮 0 1 2

//-----------------------------------------------------

var arr = [{}, {}, {}]
// for (var i = 0; i < arr.length; i++) {
//   arr[i].onclick = function (){
//     console.log(i)
//   }
// }

// // i 全局变量已经变成3了
// arr[0].onclick() // 3
// arr[1].onclick() // 3
// arr[2].onclick() // 3


// // 优化
// for (var i = 0; i < arr.length; i++) {
//   arr[i].onclick = (function (i) { // 函数作用域
//     return function () {
//       console.log(i)
//     }
//   })(i)
// }
// arr[0].onclick() // 0
// arr[1].onclick() // 1
// arr[2].onclick() // 2


// // 优化2
// for (let i = 0; i < arr.length; i++) {
//   arr[i].onclick = function () {
//     console.log(i)
//   }
// }
// arr[0].onclick() // 0
// arr[1].onclick() // 1
// arr[2].onclick() // 2

// =------------------------------------------------

// // 拆解
// for (let i = 0; i < 3; i++) {
//   let i = 'foo'
//   console.log(i); // 3 次 foo 两个 i 在 不同的作用域中
// }

// //等价于
// console.log('.......................................');
// let i = 0
// if (i < 3) {
//   let i = 'foo'
//   console.log(i);
// }
// i++
// if (i < 3) {
//   let i = 'foo'
//   console.log(i);
// }
// i++
// if (i < 3) {
//   let i = 'foo'
//   console.log(i);
// }
// i++

//----------------------------------------------------
// 变量提升

console.log(a)
// var a = 1  // undefined
let a = 2 // ReferenceError: Cannot access 'a' before initialization






