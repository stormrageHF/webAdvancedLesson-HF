// 自定义

const PENDING = 'pending'
const FULFILLED = 'fulfilled'
const REJECTED = 'rejected'

class myPromise {
  constructor(executor) {
    try {
      executor(this.resolve, this.reject)
    } catch (e) {
      this.reject(e)
    }
  }
  status = PENDING;
  value = undefined;
  error = undefined;
  // resolveCallback = undefined
  // rejectCallback = undefined
  resolveCallbackList = []
  rejectCallbackList = []
  resolve = value => {
    if (this.status !== PENDING) return
    this.status = FULFILLED
    this.value = value
    // if (this.resolveCallback) {
    //   this.resolveCallback(this.value)
    // }
    while (this.resolveCallbackList.length) {
      const v = this.resolveCallbackList.shift()()
    }
  }
  reject = error => {
    if (this.status !== PENDING) return
    this.status = REJECTED
    this.error = error
    // if (this.rejectCallback) {
    //   this.rejectCallback(this.error)
    // }
    while (this.rejectCallbackList.length) this.rejectCallbackList.shift()()
  }
  then = (resolveCallback, rejectCallback) => {
    // 参数可选
    resolveCallback = typeof resolveCallback === 'function' ? resolveCallback : value => value
    rejectCallback = typeof rejectCallback === 'function' ? rejectCallback : error => { throw error }
    // 返回一个新 myPromise 对象
    let promise2 = new myPromise((resolve, reject) => {
      if (this.status === FULFILLED) {
        // fulfilled
        setTimeout(() => {
          try {
            const v = resolveCallback(this.value)
            resolvePromise(promise2, v, resolve, reject)
          } catch (e) {
            reject(e)
          }
        }, 0);
      } else if (this.status === REJECTED) {
        // rejected
        setTimeout(() => {
          try {
            const v = rejectCallback(this.error)
            resolvePromise(promise2, v, resolve, reject)
          } catch (e) {
            reject(e)
          }
        }, 0);
      } else {
        // pending
        // this.resolveCallback = resolveCallback
        // this.rejectCallback = rejectCallback
        this.resolveCallbackList.push(() => {
          setTimeout(() => {
            try {
              const v = resolveCallback(this.value)
              resolvePromise(promise2, v, resolve, reject)
            } catch (e) {
              reject(e)
            }
          }, 0);
        })
        this.rejectCallbackList.push(() => {
          setTimeout(() => {
            try {
              const v = rejectCallback(this.error)
              resolvePromise(promise2, v, resolve, reject)
            } catch (e) {
              reject(e)
            }
          }, 0);
        })
      }
    })
    return promise2
  }

  finally = (callback) => {
    return this.then(value => {
      // return myPromise.resolve(callback()).then((value) => value) // 这个返回的是 callback 那个 promise的结果
      return myPromise.resolve(callback()).then(() => value) // 这个返回的是 最外层的 value 正常应该是这个功能
    }, error => {
      return myPromise.resolve(callback()).then(() => { throw error })
    })
  }

  catch = failCallback => {
    return this.then(undefined, failCallback)
  }

  static all(array) {
    const result = []
    let index = 0; // 判断是否都有结果
    return new myPromise((resolve, reject) => {
      function addData(i, data) {
        result[i] = data;
        if (++index === array.length) {
          resolve(result) // 必须等array 里的所有请求都有结果以后再 resolve
        }
      }
      for (let i in array) {
        const curr = array[i]
        if (curr instanceof myPromise) {
          curr.then(value => addData(i, value), error => reject(error))
        } else {
          addData(i, curr)
        }
      }
    })
  }

  static resolve(value) {
    if (value instanceof myPromise) return value
    return new myPromise(resolve => resolve(value))
  }
}

function resolvePromise(promise2, v, resolve, reject) {
  if (promise2 === v) {
    return reject(new TypeError('Chaining cycle detected for promise #<Promise>'))
  }
  if (v instanceof myPromise) {
    // v.then(value => resolve(value), error => reject(error))
    v.then(resolve, reject) // 优化写法 反正也就是传个值进来
  } else {
    resolve(v)
  }
}



// export default myPromise
module.exports = myPromise

