const Maybe = require('folktale/maybe')

// const toRMB = s => Maybe.of(s)
//   .map(v => v.replace('$', ''))
//   .map(parseFloat)
//   .map(v => v * 7)
//   .map(v => v.toFixed(2))
//   .map(v => '¥' + v)
//   .unsafeGet()

// // console.log(toRMB('$299.9'))
// console.log(toRMB(null))


const toRMB = s => Maybe.fromNullable(s)
  .map(v => v.replace('$', ''))
  .map(parseFloat)
  .map(v => v * 7)
  .map(v => v.toFixed(2))
  .map(v => '¥' + v)
  .getOrElse()

console.log(toRMB(null))
