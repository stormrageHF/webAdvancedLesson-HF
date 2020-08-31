/*
for of 遍历所有可遍历的对象，数组 set map 都可以
默认不能遍历普通对象,因为普通对象是 not iterable
*/

const m = new Map()
m.set('foo', '123')
m.set('bar', 456)

for (const item of m) {
  console.log(item); // [ key, value ] 键值对数组
}