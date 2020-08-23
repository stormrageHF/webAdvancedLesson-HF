

const p = Promise.resolve(4)
const p2 = p.then().then(2).then(Promise.resolve(10))   // then() 参数必须是函数，若是 then(非函数) 只要参数是非函数，那就返回一个 pending 的 promise，一旦遇到 正确的 then ，那就把 4 传进回调函数
p2.then(v => {
  console.log(v); // 4
})

console.log(p); // Promise { 4 }
console.log(p2); // Promise { <pending> }  
