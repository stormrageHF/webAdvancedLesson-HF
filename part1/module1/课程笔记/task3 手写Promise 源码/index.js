
/*
手写 promise 源码，需要先了解 promise 的用法和功能
1. Promise 是一个类，参数是一个执行器，并且立即执行，（实质上就传一个函数进去并立马调用）
   这个执行器有两个参数也是函数, 分别对应内部函数 resolve 和 reject
2. 有三个状态 pending fulfilled rejected
   pending 变成 fulfilled 后不可修改；
   pending 变成 rejected 后不可修改；
3. 内部的 resolve 和 reject 方法都是用来修改状态的和传入值得
   resolve 等待 变 成功 传入 成功值
   reject 等待 变 失败 传入 失败原因   
3. then 方法有两个参数，resolve 回调函数，reject 回调函数，
   若状态是成功，则调用 resolve 回调函数
   若状态是失败，则调用 reject 回调函数   
4. 异步情况，promise 执行器中可能会有异步代码，导致 resolve 和 reject 的调用是延迟的滞后的，而不是当下就执行了；
   出现这种情况，then 函数中的回调调用就不会立即执行了，那怎么办呢？
   解决方案：将 then 中的两个回调函数指针存储到两个变量里，这两个变量在 resolve 和 reject 调用的时候去调用(此时要判断两个变量必须是存在的，不能是null或undefined)即可；
   毕竟真正的传值时机还是由 resolve 和 reject 来决定的；
5. 多个 then 方法的连续调用，4 中的两个变量需要改成两个数组，外部调用 then 方法时，需要将 函数指针push进数组，并在 resolve 和 reject 的时候 shift 出来，调用并执行
6. then 链式调用的实现：
   第一点，then 返回的 promise 对象 
   第二点，后一个 then 的回到函数的参数是 上一个 then 的回调函数的返回值,若这个返回值是一个 promise 对象，则后一个 then的回调函数的参数是这个 promise 的结果
7. 捕获自己返回自己的错误   
8. 捕获其他的异常，要在执行器以及 resolve 和 reject 调用的地方 加 try catch 
9. 实现 静态 all 方法，其实就是解决，包含多个请求的数组当作参数传入，最终按数组顺序返回一个包含各路请求结果的新数组
10. 实现静态 resolve 方法，很简单
*/

const p = new Promise(function (resolve, reject) {
  setTimeout(() => {
    resolve('1秒后 success')
    reject('1秒后 error')
  }, 1000);

  // resolve('success')
  // reject('error')
})
console.log(p);

// p.then(value => {
//   console.log(value);
// }, error => {
//   console.log(error);
// })

// p.then(value => {
//   console.log(value);
// }, error => {
//   console.log(error);
// })

// p.then(value => {
//   console.log(value);
// }, error => {
//   console.log(error);
// })

function other() {
  return new Promise(function (resolve, reject) {
    resolve('other')
  })
}

const p1 = p.then(value => {
  console.log(value); // 1秒后 success
  // return 100
  return p1 // 返回我自己会报错 
}, error => {
  console.log(error);
})

p1
  .then(value => {
    console.log(value); // 100
    return other()
  }, error => {
    console.log('返回我自己', error); // 返回我自己 TypeError: Chaining cycle detected for promise #<Promise>
  })
  .then(value => {
    console.log(value); // other
  })


function p11() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve('p11')
    }, 2000);
  })
}

function p12() {
  return new Promise((resolve, reject) => {
    resolve('p12')
  })
}

// 参数是数组，all 返回的是一个 promise 对象，then 的回调里会返回一个结果数组，而且顺序一致的
Promise.all(['1', '2', p11(), p12(), 'a', 'b']).then(values => {
  console.log(values); // [ '1', '2', 'p11', 'p12', 'a', 'b' ]
})


// finally  不论结果如何都会响应
p12().finally(() => {
  console.log('finally');
  return p11()
}).then(value => {
  console.log('finally',value); // finally p12  会等待 p11 执行完毕
}, error => {
  console.log('finally',error);
})



