
/*
flow 从左到右
flowRight 从右到左
*/

const _  = require('lodash')

const reverse = array => array.reverse()
const first = array => array[0]
const toUpper = str => str.toUpperCase()

const f  = _.flowRight(toUpper, first, reverse)
const arr = ['aaa', 'bbb','ccc']
console.log(f(arr)); // CCC