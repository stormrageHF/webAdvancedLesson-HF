
console.log('start');

setTimeout(() => {
  console.log('setTimeout'); // 宏任务执行顺序比微任务靠后
}, 0);

Promise.resolve()
.then(()=>{
  console.log('pp1'); // 微任务先执行
})
.then(()=>{
  console.log('pp2');
})
.then(()=>{
  console.log('pp3');
})

console.log('end');