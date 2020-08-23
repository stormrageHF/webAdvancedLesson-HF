// 链式调用

import ajax from './05-promise-ajax.js'

let url = "api/users.json"
ajax(url)
  .then(function (value) { // 1. then 方法返回一个新的 promise 对象 
    console.log(111);
    console.log(value); 

  }).then(function (value) {  // 2. 后一个 then 方法 实际上就在为上一个 then 方法返回的 promise 做回调注册
    console.log(222);
    console.log(value); // undefined 上一个回调函数默认返回的是 undefined

  }).then(function (value) { 
    console.log(333);
    console.log(value); // undefined
    return ajax(url) // 返回一个自定义 promise 

  }).then(function (value) { // 4. 上一个 then 方法的回调函数若返回是一个 promise ，而不是一个值，那下一个 then 的回调会等待它的结束
    console.log(444);
    console.log(value); // 上一个 ajax 的结束后，返回成功的结果,如果失败就不进来了
    return 'ccc' // 返回一个值 默认是 undefined

  }).then(function (value) { // 3. 上一个 then 方法回调函数的返回值 就是下一个 then 方法回调函数的参数 value  
    console.log(555);
    console.log(value); // ccc

  })