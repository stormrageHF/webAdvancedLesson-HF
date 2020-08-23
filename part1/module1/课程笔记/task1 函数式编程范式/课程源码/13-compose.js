// 函数组合
function compose (f,g) {
  return function (value) {
    return f(g(value))
  }
}

function reverse (array) {
  return array.reverse()
}

function first (array) {
  return array[0]
}

const last = compose(first, reverse)
const arr = [1,2,3]
console.log(last(arr)); // 3  先反转 获取第一个值