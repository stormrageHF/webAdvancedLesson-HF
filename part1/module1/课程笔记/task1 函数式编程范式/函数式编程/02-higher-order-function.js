// 函数作为返回值 像极了闭包
function makeFn() {
  let msg = "hello world"
  return function () {
    console.log(msg);
  }
}

let f1 = makeFn()
f1()
// 第二种调用方法
makeFn()()


// 自定义once 
// 使用场景：支付-只能点击一次
function once(fn) {
  let done = false; // 支付是否结束
  return function () { // 返回一个支付函数
    if (!done) {
      done = true;
      fn.apply(this, arguments)
    }
  }
}

const pay = once(function (money) {
  console.log(`支付了${money}元`);
})

pay(5)
pay(5)
pay(5)

