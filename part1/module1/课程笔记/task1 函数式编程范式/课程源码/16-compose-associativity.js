// 结合律
const _ = require('lodash')

// const f = _.flowRight(_.toUpper, _.first, _.reverse)
// const f = _.flowRight(_.flowRight(_.toUpper, _.first), _.reverse)
const f = _.flowRight(_.toUpper, _.flowRight(_.first, _.reverse))

console.log(f(['aaa', 'bbb', 'ccc'])); // CCC

// 不论先结合前两个还是后两个结果都一样