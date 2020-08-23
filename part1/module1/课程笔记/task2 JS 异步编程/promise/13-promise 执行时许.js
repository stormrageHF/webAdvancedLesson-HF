
const p = new Promise(function (resolve,reject) {
  // 内部执行还是同步的主线
  console.log(1);
  resolve() // 这里触发了异步
  console.log(2);
})
p.then(v => { // 异步 消息队列, 要等主线执行完毕才执行
  console.log(3);
})

console.log(4);

 // 1 2 4 3