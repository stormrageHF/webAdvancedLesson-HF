
const p = new Promise((resolve, reject) => {
  // setTimeout(() => {
  //   resolve('success')
  //   reject('error')
  // }, 1000);

  // resolve('p success')
  reject('p error')
})

// p.then(value => {
//   console.log(value);
// }, error => {
//   console.log(error);
// })

// Promise.all(['1', p, 'v']).then(v => {
//   console.log('all', v);
// }, error => {
//   console.log('all', error);
// })

// Promise.resolve(p).then(console.log, console.log)

const p2 = new Promise((resolve, reject) => {
  setTimeout(() => {
    // resolve('p2 success')
    reject('p2 error')
  }, 2000);

  // resolve('success')
  // reject('error')
})

p.finally(v => {
  console.log('finally',v);
  // return '1111'
  return p2
}).then(console.log,console.log)
