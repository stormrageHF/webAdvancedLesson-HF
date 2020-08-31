// object.is 判断两个值是否相等 常用于解决数学问题

console.log(Object.is(NaN, NaN)); // true
console.log(NaN == NaN); // false
console.log(NaN === NaN); // false

console.log(+0 === -0); // true
console.log(Object.is(+0, -0)); // false





