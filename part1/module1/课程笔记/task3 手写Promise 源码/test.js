
// import myPromise from './myPromise'
const myPromise = require('./myPromise');
const { resolve } = require('./myPromise');

const mp = new myPromise(function (resolve, reject) {

  // throw new Error('executor error')

  setTimeout(() => {
    resolve('1秒后 success')
    // reject('1秒后 error')
  }, 1000);

  // resolve('success')
  // reject('error')
})
console.log(mp);

// mp.then(value => {
//   console.log(value);
// }, error => {
//   console.log(error);
// })

// mp.then(value => {
//   console.log(value);
// }, error => {
//   console.log(error);
// })

// mp.then(value => {
//   console.log(value);
// }, error => {
//   console.log(error);
// })

function other() {
  return new Promise(function (resolve, reject) {
    resolve('other')
  })
}

const mp1 = mp.then(value => {
  // throw new Error('then error')
  console.log(value); // 1秒后 success
  return 100
  // return mp1 // 返回自己下面捕获异常
}, error => {
  console.log(error);
  return 10000
}).then(value => {
  console.log('123123');
  console.log(value);
})

// mp1.then(value => {
//   console.log(value); // 100
//   return other()
// }, error => {
//   console.log('mp1响应', error.message); // Chaining cycle detected for promise #<Promise>
// })
//   .then(value => {
//     console.log(value); // other
//   })


function mp2() {
  return new myPromise((resolve, reject) => {
    // resolve('1000')
    reject('error')
  })
}

mp2().then(2)
  .then({
    name: 'hanfei'
  })
  .then(value => console.log(value), error => console.log(error))

// 测试 all
function mp11() {
  return new myPromise((resolve, reject) => {
    setTimeout(() => {
      resolve('mp11')
    }, 2000);
  })
}

function mp12() {
  return new myPromise((resolve, reject) => {
    // reject('mp12 error')
    resolve('mp12')
  })
}

myPromise.all(['1', '2', mp11(), mp12(), 'a', 'b']).then(values => console.log(values), error => console.log(error))

myPromise.resolve(250).then(console.log) // 250
myPromise.resolve(mp11()).then(console.log) // mp11



// finally
mp12().finally(() => {
  console.log('finally');
  return mp11()
}).then(value => {
  console.log('mp12 finally 成功', value);
}, error => {
  console.log('mp12 finlly 失败', error);
})


// catch 
new myPromise((resolve, reject) => {
  reject('catch 捕获')
}).then(value => {
  console.log(value);
})
  .catch(error => {
    console.log(error); // catch 捕获
  })


