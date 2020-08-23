
// 基本用法
/**
 * 参数是一个函数；
 * 参数函数的参数有两个，第一个是用来触发 fulfilled 的 resolve 函数， 一个是用来触发 rejected 的 reject 函数；
 * 
 * 这两个方法传参：
 * resolve 方法传递成功的结果
 * reject 方法传递 error 对象
 * 
 * 返回一个 promise 对象，通过 then 方法来监听结果响应，第一个参数是响应 fulfilled 的方法， 第二个参数是响应 rejected 的方法；
 */
const isSuccess = true; // false 

const p = new Promise(function (resolve, reject) {

  if (isSuccess) {
    resolve('success')
  } else {
    reject(new Error('error'))
  }

})

p.then(function (value) {
  console.log(value);
}, function (err) {
  console.log(err);
})

console.log('end');