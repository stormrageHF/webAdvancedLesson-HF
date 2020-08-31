// set 成员不重复的集合，类数组

const s = new Set()
// 添加成员 add
s.add(1).add(2).add(2).add(2).add(3).add(4).add(2)
console.log(s); // Set(4) { 1, 2, 3, 4 } 自动去重

// 是否包含 has
console.log(s.has(2)); // true

// 遍历
s.forEach(element => {
  console.log(element);
});

for (const iterator of s) {
  console.log(iterator);
}

// 删除成员 delete
s.delete(4)
console.log(s); // Set(3) { 1, 2, 3 }

// 清空 clear
s.clear()
console.log(s); // Set(0) {}


// 给数组去重

const arr = [1,2,3,1,2,4]

const sarr = new Set(arr) // 数组转set
console.log(sarr); // Set(4) { 1, 2, 3, 4 }
// console.log([...sarr]); // [ 1, 2, 3, 4 ] set 转数组
console.log(Array.from(sarr)); // [ 1, 2, 3, 4 ] 类数组转数组 from

