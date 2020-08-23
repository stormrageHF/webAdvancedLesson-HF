// 两个静态方法 resolve reject


{
  const p1 = Promise.resolve('foo')

  // 等价于

  const p2 = new Promise(function (resolve, reject) {
    resolve('foo')
  })

  p1.then(function (value) {
    console.log(value); // foo
  })

  p2.then(function (value) {
    console.log(value); // foo
  })
}

// 还可以传入 promise 对象, 返回传入的 promise 对象
{
  const p1 = new Promise(function (resolve, reject) { })
  const p2 = Promise.resolve(p1)
  console.log(p1 === p2); // true
}

// 对象构造 promise
{
  const p = Promise.resolve({
    then: function (onFulfilled, onRejected) {
      onFulfilled('bar')
    }
  })
  // 可以返回一个 promise 对象
  p.then(function (value) {
    console.log(value); // bar
  })
}


// reject(err) 快速返回一个 失败的 promise, catch 里的回调函数的参数就是 err
{
  Promise.reject('fail')
    .catch(function (error) {
      console.log(error); // fail
    })

  Promise.reject(new Error('报错了'))
    .catch(function (err) {
      console.log(err); // 
    })
}








