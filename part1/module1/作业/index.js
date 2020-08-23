console.log('start')
setTimeout(() => {
  console.log('timer1 start')
  Promise.resolve().then(function() {
    console.log('promise1')
  })
  console.log('timer1 end');
}, 0)
setTimeout(() => {
  console.log('timer2')
  Promise.resolve().then(function() {
    console.log('promise2')
  })
}, 0)
Promise.resolve().then(function() {
  console.log('promise3')
})
console.log('end')