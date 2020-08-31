// 数组转参数 又叫 展开数组

const arr = [1, 2, 3]

function foo(...args) {
  console.log(...args); // 这里也可以拿到参数,由 ... 和 数组组成
}

// old 
foo.apply(foo, arr)

foo(...arr) // 可以把一个数组 加上 ... 当成参数传进函数