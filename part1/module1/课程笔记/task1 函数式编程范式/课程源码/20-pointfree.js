// point free 模式

// 其实就是函数组合

// HELLO   WORLD -> hello_world

const fp = require('lodash/fp')

const f = fp.flowRight(fp.replace(/\s+/g, '_'), fp.toLower)

console.log(f('HELLO   WORLD')); // hello_world