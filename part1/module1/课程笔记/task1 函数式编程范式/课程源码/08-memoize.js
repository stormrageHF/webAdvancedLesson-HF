// 记忆函数

const _ = require('lodash');
const { chain } = require('lodash');

// 求圆面积(pure function 纯函数)
function getArea (r){
  console.log(r);
  return Math.PI * r * r;
}

// 记忆函数 缓存 纯函数的返回值 (闭包实现)
const getAreaWithMemory = _.memoize(getArea)

console.log(getAreaWithMemory(4)); // 4  50.26548245743669
console.log(getAreaWithMemory(4)); // 50.26548245743669
console.log(getAreaWithMemory(4)); // 50.26548245743669


// 自定义
function memoize (fn) {
  let cache = {}
  return function () {
    let key = JSON.stringify(arguments)
    return cache[key] = cache[key] || fn.apply(fn, arguments)
  }
}

const customArea = memoize(getArea)
console.log(customArea(4));
console.log(customArea(4));
console.log(customArea(4));