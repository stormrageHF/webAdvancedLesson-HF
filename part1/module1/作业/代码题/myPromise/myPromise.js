/*
1. promise 是一个类，有一个执行器并且立即执行;
2. 有三种状态pending，fulfilled，rejected
   成功 resolve 方法修改状态， pending 可转成 fulfilled，变化后不可变,并且传入成功的结果
   失败 reject 方法修改状态， pending 可转成 rejected ，变化后不可变，并且传入失败的原因 
3. then 方法根据自身状态做出对应的响应
   第一个参数是成功的回调，第二个参数是失败的回调  
4. promise 执行器中可以执行异步代码，then 会等待结果并响应输出 
   执行器中异步任务开始，then 执行的时候状态不会及时修改，需要等待异步任务结束，根据返回结果响应
   所以我们要将回调函数临时存储到一个数组，等到异步任务结束再响应,
   如何响应呢？
   就是将临时数组第一个元素（回调函数）输出并执行（传值），直到数组为空
5. then 可以链式调用，因为then 方法返回一个新 promise 对象  
   5.1 上一个then中回调函数的返回值是下一个then中回调函数的参数
   5.2 上一个then中回调函数的返回值若是 promise 对象，则下一个then中回调函数的参数是这个 promise 的响应结果
   要封装一个公共函数
   then 的回调中不能返回自己的 promise 否则报错，需要setTimeout
6. 捕获异常，需要捕获异常的地方：
   执行器；
   then 的回调函数中的异常也会捕获；  
到 6 为止就算大部分完成

7. then 的参数是可选的,成功回调函数里的参数要return，失败回调函数里的参数要 throw    
8. all 方法，参数是一个数组，内容可以是值也可以是异步任务，返回值是一个promise，promise then的成功回调函数的参数是对应参数数组的顺序返回的结果数组
9. resolve 方法 参数是普通值返回一个promise，并响应 then 的成功回调；若是promise 则直接返回；
10. catch 方法 用 then 实现
11. finally 方法 then 方法和 静态resolve方法实现
   
*/
const PENDING = 'pending'
const FULFILLED = 'fulfilled'
const REJECTED = 'rejected'

class MyPromise {
  constructor(executor) {
    // 捕获异常
    try {
      // 执行器立即执行
      executor(this.resolve, this.reject)
    } catch (e) {
      this.reject(e)
    }

  }
  // 状态
  status = PENDING
  // 成功的值
  value = undefined
  // 失败的原因
  reason = undefined
  // 成功回调队列
  successCallbackList = []
  // 失败回调队列
  failCallbackList = []
  // 成功
  resolve = value => {
    if (this.status !== PENDING) return
    this.status = FULFILLED
    this.value = value
    while (this.successCallbackList.length) {
      this.successCallbackList.shift()()
    }
  }
  // 失败
  reject = reason => {
    if (this.status !== PENDING) return
    this.status = REJECTED
    this.reason = reason
    while (this.failCallbackList.length) {
      this.failCallbackList.shift()()
    }
  }
  // then
  then(successCallback, failCallback) {
    /// 可选参数
    successCallback = typeof successCallback === 'function' ? successCallback : value => value
    failCallback = typeof failCallback === 'function' ? failCallback : error => { throw error }

    // 返回一个新的 promise
    const mp2 = new MyPromise((resolve, reject) => {
      // 根据状态做出响应
      if (this.status === FULFILLED) {
        setTimeout(() => {
          try {
            // 调用成功回调并得到返回值
            const r = successCallback(this.value)
            // 将返回值传入resolvePromise方法做判断处理
            resolvePromise(mp2, r, resolve, reject)
          } catch (e) {
            reject(e)
          }
        }, 0);
      } else if (this.status === REJECTED) {
        setTimeout(() => {
          try {
            // 调用失败回调函数并得到返回值
            const r = failCallback(this.reason)
            // 将返回值传入resolvePromise方法做判断处理
            resolvePromise(mp2, r, resolve, reject)
          } catch (e) {
            reject(e)
          }
        }, 0);
      } else if (this.status === PENDING) {
        // 执行器中异步任务开始，then 执行的时候状态不会及时修改，需要等待异步任务结束，根据返回结果响应
        // 先将两个回调函数缓存
        // 注意：这里push 的函数只能是箭头函数，因为this的指向问题
        this.successCallbackList.push(() => {
          setTimeout(() => {
            try {
              // 调用成功回调并得到返回值
              const r = successCallback(this.value)
              // 将返回值传入resolvePromise方法做判断处理
              resolvePromise(mp2, r, resolve, reject)
            } catch (e) {
              reject(e)
            }
          }, 0);
        })
        this.failCallbackList.push(() => {
          setTimeout(() => {
            try {
              // 调用失败回调函数并得到返回值
              const r = failCallback(this.reason)
              // 将返回值传入resolvePromise方法做判断处理
              resolvePromise(mp2, r, resolve, reject)
            } catch (e) {
              reject(e)
            }
          }, 0);
        })
      }
    })
    return mp2
  }
  // catch
  catch = failCallback => {
    return this.then(undefined, failCallback)
  }
  // all
  static all(array) {
    const result = []
    let index = 0
    return new MyPromise((resolve, reject) => {
      function addData(i, data) {
        result[i] = data
        if (++index === array.length) {
          resolve(result)
        }
      }
      for (let i = 0; i < array.length; i++) {
        const cur = array[i]
        if (cur instanceof MyPromise) {
          cur.then(v => addData(i, v), reject)
        } else {
          addData(i, cur)
        }
      }

    })
  }
  // resolve
  static resolve(v) {
    if (v instanceof MyPromise) return v
    return new MyPromise((resolve) => resolve(v))
  }
  // finally
  finally(callback) {
    return this.then(value => {
      return MyPromise.resolve(callback())
        .then(() => value)
      // 这里不处理callback 成功回调中的参数，而是直接 返回外部 value
    }, error => {
      return MyPromise.resolve(callback())
        .then(() => { throw error })
    })
  }
}

/*
先判断 x 的值是普通值还是promise对象
若是普通值则直接调用resolve
若是promise对象，则查看它的结果后
根据结果决定调用resolve 还是调用reject

其实就是在我内部的 then方法中，我拿到了你这个返回值，即又一个promise对象，
那我就获取你的then中的结果，把你的结果传入我响应中
*/
function resolvePromise(mp, x, resolve, reject) {
  if (mp === x) {
    return reject(new TypeError('TypeError: Chaining cycle detected for promise #<Promise>'))
  }
  if (x instanceof MyPromise) {
    // promise 对象
    x.then(resolve, reject)
  } else {
    // 普通值
    resolve(x)
  }
}


module.exports = MyPromise

