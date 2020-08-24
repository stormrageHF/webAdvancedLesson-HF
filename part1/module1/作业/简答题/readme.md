1.js异步编程是什么？ EvetLoop和消息队列是什么？ 什么是宏任务？ 什么是微任务？

js 异步模式用来解决同步模式下耗时任务带来的阻塞问题。
常见的异步模式：
回调函数，事件监听，发布/订阅模式，Promise，Generator(ES6)，async/await(ES7)

EventLoop 是一种程序结构，用来等待和发送消息事件。是用来实现 js 异步任务的机制。

消息队列是用来存放异步任务结束后的回调函数

宏任务 macrotask 队列：会有一些异步任务的回调依次进入队列等待后序调用，包括：
setTimeout setInterval  setImmediate(node)  requestAnimationFrame(浏览器)  I/O操作  UI rendering(浏览器)

微任务 microtask 队列：会有一些其他异步任务的回调依次进入队列等待后序调用，包括：
process.nextTick(node) Promise MutationObserver Object.Observe(废弃)

实现过程：
js 的单线程任务分为同步任务和异步任务，同步任务会在调用栈（call stack）中按照顺序等待主线程依次执行，
异步任务会等异步任务有了结果以后，将注册的回调函数放入任务队列中，等主线程空闲的时候（调用栈清空），
将任务队列中的任务依次放入调用栈中等待主线程执行。

当宏任务执行结束后，会检查微任务队列是否为空，若不为空就会执行微任务，直到微任务队列变空，继续执行下一个宏任务，
所以优先执行微任务





