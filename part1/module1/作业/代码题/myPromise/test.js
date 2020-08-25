
const MyPromise = require('./myPromise')

const mp = new MyPromise((resolve, reject) => {
  // throw new Error('executor error')

  // setTimeout(() => {
  //   resolve('success')
  //   reject('error')
  // }, 1000);

  resolve('success')
  reject('error')
})

// mp.then(res => {
//   console.log(res);
// }, error => {
//   console.log(error);
// })

// MyPromise.all(['1', mp, 'v']).then(v => {
//   console.log('all', v);
// }, error => {
//   console.log('all',error);
// })

// Promise.resolve(mp).then(console.log, console.log)

const mp2 = new MyPromise((resolve, reject) => {
  // throw new Error('executor error')

  setTimeout(() => {
    // resolve('mp2 success')
    reject('mp2 error')
  }, 2000);

  // resolve('success')
  // reject('error')
})

// mp.finally(() => {
//   console.log('finally');
//   return mp2
// }).then().then(console.log, console.log)

mp2.then(console.log).catch(error => {
  console.log('mp2',error);
})






