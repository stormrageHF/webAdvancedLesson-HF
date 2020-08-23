// 纯函数 不纯函数 
// slice / splice

const arr = [1, 2, 3, 4, 5]

console.log(arr.slice(0, 3)); // [ 1, 2, 3 ]
console.log(arr.slice(0, 3));
console.log(arr.slice(0, 3));


console.log(arr.splice(0, 1)); // [1]
console.log(arr.splice(0, 1)); // [2]
console.log(arr.splice(0, 1)); // [3]

console.log(arr);

// 纯函数不会修改数据源

function getSum(n1, n2) {
  return n1 + n2;
}

console.log(getSum(1,2)); // 3
console.log(getSum(1,2)); // 3
console.log(getSum(1,2)); // 3

// 纯函数也不会对变量做缓存


