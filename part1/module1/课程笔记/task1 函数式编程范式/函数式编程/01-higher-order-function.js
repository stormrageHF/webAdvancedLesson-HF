
// 自定义forEach，高阶函数-函数作为参数
function forEach(array, fn) {
  for (let i = 0; i < array.length; i++) {
    fn(array[i])
  }
}

let arr = [1, 2, 3, 4, 5]

forEach(arr, function (item) {
  console.log(item);
})


// 自定义filter
function filter(array, fn) {
  const result = [];
  for (let i = 0; i < array.length; i++) {
    if (fn(array[i])) { // 满足条件push
      result.push(array[i])
    }
  }
  return result;
}

const arr2 = [10, 20, 30, 55]
const r = filter(arr2, function (item) {
  return item % 2 === 0;
})
console.log(r);

// array 常用的高阶函数，下面自定义 map every some

// 自定义 map：遍历数组的每个元素并对每个元素进行处理，最后返回一个新数组，肯定有两个参数, array 和 fn
const map = (array, fn) => {
  const result = []
  for (let v of array) {
    result.push(fn(v))
  }
  return result;
}

{
  const arr3 = [1, 2, 3, 4]
  const am = map(arr3, (item) => {
    return item * 2;
  })
  console.log(am); // [ 2, 4, 6, 8 ]

}

// 自定义 every，数组中每个元素都满足那个条件就返回 true，否则返回 false 
const every = (array, fn) => {
  for (const v of array) {
    if (!fn(v)) {
      return false
    }
  }
  return true
}

{
  const arr4 = [2, 4, 6, 8]
  const arr5 = [2, 4, 6, 7, 8]

  const r4 = every(arr4, item => item % 2 === 0)
  console.log(r4); // true

  const r5 = every(arr5, item => item % 2 === 0)
  console.log(r5); // false
}

// some，数组中只要有一个元素满足条件就返回 true

const some = (array,fn) => {
  for (const v of array) {
    if(fn(v)){
      return true
    }
  }
  return false
}

{
  const arr5 = [1,2,3,0,4]

  const r1 = some(arr5, item => item === 0)
  console.log(r1); // true

  const r2 = some(arr5, item => item === 8)
  console.log(r2); // false
}
