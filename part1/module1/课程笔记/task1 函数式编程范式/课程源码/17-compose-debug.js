// 函数组合得调试

// NEVER SAY DIE -> never-say-die

const _ = require('lodash')

const split = _.curry((sep, str) => _.split(str, sep)) // str => arr

const join = _.curry((sep, arr) => _.join(arr, sep)) // arr -> str

// debug 函数
const log = _.curry((str, v) => {
  console.log(str, v);
  return v;
})

const map = _.curry((fn, arr) => _.map(arr, fn)) // 柯里化 调换参数位置 

// const f = _.flowRight(join('-'), log, _.toLower, log, split(' '))

const f = _.flowRight(join('-'), log('map 之后'), map(_.toLower), log('split 之后'), split(' '))

console.log(f('NEVER SAY DIE'));