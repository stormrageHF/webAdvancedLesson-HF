1. 早期 js 就是用来操作 dom 得脚本语言；
所以设计成了单线程模式；

主要内容：
 同步模式和异步模式 （sync和async）
 事件队列和消息队列
 异步编程得几种方式
 Promise 异步方案/ 宏任务 / 微任务队列
 Generator 异步方案，Async / Await 语法糖



 2. Promise
 CommenJS 提出得规范，为了避免回调地狱
 promise 是一个对象，启动以后会进入pending状态，等待两种结果，fulfilled 或者 rejected，
 结果出来以后，会触发对应得监听 onFulfilled  onRejected

 嵌套使用promise 是错误的，还是会造成回调地狱
 正确用法应该是链式调用，其实链式调用和柯里化有相似点，promise 每响应一次都会返回 promise，那么它就可以继续响应其他的方法

 1.promise 的 then 方法返回的是一个新的 pormise 对象；
 2.后面的 then 方法就是再为上一个 then 返回的 promise 对象做注册回调；
 3.前面 then 方法中回调函数的返回值会作为后面 then 方法中回调函数的参数；
 4.如果前面 then 回调中返回的是 promise，那后面 then 方法的回调会等待的它的结束；


 3. promise 捕获异常

 1.onRejected 捕获异常是捕获的 promise 的回调函数中的所有异常
  比如 foo（）未定义函数，throw new Error（）抛出一个错误 这都会捕获到
  不仅仅是捕获 http 的错误，而是所有的错误，所有的报错

 2.catch 方法经常用来注册捕获异常，可以把 onRejected 方法传进 catch的参数中；
  catch 是 then 的别名，catch( function onRejected () {}) 等价于 then( undefined, function onRejected () {})

  区别：
  catch 捕获的是 then 返回的新 promise 中的异常 ，也可以捕获第一个 promise 中的异常，也就是到它为止的前面所有的 promise 异常
  then 捕获的是当前 promise 返回的 的异常
  所以 catch 捕获的范围要大


  4. 静态方法 resolve reject  

  5. promise 提供了并行执行的静态方法，all 和 race ， 她们都是传入多个 promise 对象，返回一个新的 promise 对象。
  all() 方法参数是多个 promise 对象，最终会等所有的 promise 对象 成功执行完毕 后才返回新的 promise；
  race() 方法的参数也是多个 promise 对象，区别在于只要有一个 promise 执行完毕后就返回新的 promise , 不会等待其他的 promise 对象；


  6. 调用时许，宏任务和微任务
  回调队列里排队的任务都是宏任务，
  当前宏任务执行完毕后，临时附带的一些小需求，我们不会将这些小需求重新生成一个宏任务进入队列；
  而是就在当下执行了，这些小需求就是微任务

  常见宏任务：setTimeout， 绝大部分异步调用API
  常见微任务：promise， MutationObeserver，process.nextTick

  微任务比宏任务执行更早



  7. Generator 生成器函数
  通过 next 和 yield 配合使用来完成一段代码的执行和停止
  可以降低回调，实现扁平化


  8.Async / Await 
  原理和生成器类似
  区别是 async 返回一个 promise ，所以我们可以在 promise 里做处理


