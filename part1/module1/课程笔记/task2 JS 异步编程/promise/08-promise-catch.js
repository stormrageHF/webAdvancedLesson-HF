// 捕获异常

function ajax(url) {
  return new Promise(function (resolve, reject) {
    // foo()
    // throw new Error()

    const xhr = new XMLHttpRequest();
    xhr.open('GET', url)
    xhr.responseType = 'json'
    // 这里不能用 箭头函数 否则 this 指向 window
    xhr.onload = function () {
      if (this.status === 200) {
        resolve(this.response)
      } else {
        reject(new Error(this.statusText))
      }
    }
    xhr.send()
  })
}

// 在浏览器里测试，因为用到了浏览器的API

let url = "api/users.json1"; // error

// ajax(url).
//   then(function onFulfilled(value) {
//     console.log(value);
//   }, function onRejected(error) {
//     console.log('onRejected', error);
//   })

/*

1. onRejected 捕获异常是捕获的 promise 的回调函数中的所有异常
比如 foo（）未定义函数，throw new Error（）抛出一个错误 这都会捕获到
不仅仅是捕获 http 的错误，而是所有的错误，所有的报错

*/

console.log('---------------------------------------------------');

url = 'api/users.json'
ajax(url).
  then(function onFulfilled(value) {
    console.log(value); // (2) [{…}, {…}]
    foo() // 未定义函数
  }).catch(function onRejected(error) {
    console.log('catch onRejected', error); // catch onRejected ReferenceError: foo is not defined
  })

ajax(url).
  then(function onFulfilled(value) {
    console.log(value); // (2) [{…}, {…}]
    foo() // 未定义函数
  }, function onRejected(error) {
    console.log('onRejected', error); // 没有捕获到，因为这个 rejected 只观察 ajax 的 promise； 如果这里捕获到了，后面就不在捕获了，总体只捕获一次
  }).
  then(function onFulfilled(value) { // 这里就类似于 catch ， 只是多了一个成功的回调
    console.log(value); // 没有响应
  }, function onRejected(error) {
    console.log('onRejected', error); // onRejected ReferenceError: foo is not defined
  })


/*
2. catch 方法经常用来注册 捕获异常，可以把 onRejected 方法传进 catch的参数中；
catch 是 then 的别名，catch( function onRejected () {}) 等价于 then( undefined, function onRejected () {})

区别：
catch 捕获的是 then 返回的新 promise 中的异常 ，也可以捕获 ajax 返回的 promise 中的异常
then 捕获的是 ajax 返回的 promise 的异常
所以 catch 捕获的范围要大
*/