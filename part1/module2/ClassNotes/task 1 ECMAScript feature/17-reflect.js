/*
Reflect 内部封装了对对象底层的一系列操作
成员方法就是proxy处理对象的默认实现

ES6 中将 Object 的一些明显属于语言内部的方法移植到了 Reflect 对象上（当前某些方法会同时存在于 Object 和 Reflect 对象上），未来的新方法会只部署在 Reflect 对象上。

Reflect 对象对某些方法的返回结果进行了修改，使其更合理。

Reflect 对象使用函数的方式实现了 Object 的命令式操作。

应该有13个方法 菜鸟和mdn上都有
*/

const obj = {
  name: 'andy',
  age: 18
}

// console.log('name' in obj); // true
// console.log(Object.keys(obj)); // [ 'name', 'age' ]
// console.log(delete obj.age); // true


console.log(Reflect.has(obj, 'name')); // true
console.log(Reflect.ownKeys(obj)); // [ 'name', 'age' ]
console.log(Reflect.deleteProperty(obj, 'age')); // true