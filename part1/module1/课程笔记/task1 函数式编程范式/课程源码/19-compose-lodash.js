// map 在 lodash 和 lodash/fp 中也是不一样得

const _ = require('lodash')
const fp = require('lodash/fp')

console.log(_.map(['23', '8', '10'], parseInt)); // [ 23, NaN, 2 ]
// 输出结果不是我们想要得原因分析
/*
迭代时，将三个参数传入 parseInt (value, index|key, array)
可是 parseInt 得参数得意义分别是：值，进制

parseInt ('23', 0, array)  0 表示 10 进制
parseInt ('8', 1, array) 1 识别不出来 
parseInt ('10', 2, array) 2 表示 2 进制

用 fp.map 可以避免上述问题
*/

console.log(fp.map(parseInt, ['23', '8', '10'])); // [ 23, 8, 10 ]



