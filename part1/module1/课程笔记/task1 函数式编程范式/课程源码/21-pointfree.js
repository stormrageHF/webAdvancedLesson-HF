//  pointfree 案例 一个字符串中得首个字母提取出来转成大写并用. 做分隔符
//  world wild web => W. W. W

const fp = require('lodash/fp')

// const f = fp.flowRight(fp.join('. '), fp.map(fp.toUpper), fp.map(fp.first), fp.split(' '))

// 优化 因为 map 用了两次，所以优化得逻辑就是把重复得地方再合并 toUpper first 组合成新函数

const f = fp.flowRight(fp.join('. '), fp.map(fp.flowRight(fp.toUpper, fp.first)), fp.split(' '))


console.log(f('world wild web')); // W. W. W

