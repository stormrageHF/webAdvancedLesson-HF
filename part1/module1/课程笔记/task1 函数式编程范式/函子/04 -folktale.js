const { compose, curry } = require('folktale/core/lambda')
const { first, toUpper } = require('lodash/fp')

const f = curry(2, (x, y) => {
  return x + y
})

console.log(f(1,2)); // 3
console.log(f(1)(2)); // 3

const f2 = compose(toUpper, first)
console.log(f2(['aaa','bbb'])); // AAA
