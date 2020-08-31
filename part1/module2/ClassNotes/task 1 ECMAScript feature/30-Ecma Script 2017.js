// ECMAScript 2017

const obj = {
  name: 'hanfei',
  age: 15
}
// Object.values
{
  // 返回一个包含所有 value 的数组
  console.log(Object.values(obj)); // [ 'hanfei', 15 ]
}

// Object.entries
{
  console.log(Object.entries(obj)); // [ [ 'name', 'hanfei' ], [ 'age', 15 ] ]
  for (const [key, value] of Object.entries(obj)) {
    console.log(`${key},${value}`);
  }
  // 词目数组可以转 map
  console.log(new Map(Object.entries(obj))); // Map(2) { 'name' => 'hanfei', 'age' => 15 }

}

// Object.getOwnPropertyDescriptors
{
  // 获取一个对象的属性描述对象
  const p1 = {
    firstName: 'Lei',
    lastName: 'Wang',
    get fullName () {
      return this.firstName + ' ' + this.lastName
    }
  }
  console.log(p1.fullName); // Lei Wang
  const p2 = Object.assign({}, p1)
  p2.firstName = 'fei'
  console.log(p2); // { firstName: 'fei', lastName: 'Wang', fullName: 'Lei Wang' }
  // fullName  复制过来的时候当成死值了 assing 无法复制

  // 成功复制
  const descriptors = Object.getOwnPropertyDescriptors(p1)
  // console.log(descriptors);
  const p3 = Object.defineProperties({},descriptors)
  p3.firstName = 'fei'
  console.log(p3.fullName); // fei Wang
}


// String.prototype.padStart / padEnd
// padStart(n,str)  转成长度为 n 的字符串，多余的空位用 str 填充
// 这个方法可以用来统一长度
let s1 = 'aaaa'
let s2 = 'bbb'
let s3 = 'cc'

console.log(s1.padEnd(10,'-')); // aaaa------
console.log(s2.padEnd(10,'-')); // bbb-------
console.log(s3.padEnd(10,'-')); // cc--------

// 转成长度都是 10 的字符串 ，多余的位置用 - 填充

console.log(s1.padStart(5, '0')); // 0aaaa
console.log(s2.padStart(5, '0')); // 00bbb
console.log(s3.padStart(5, '0')); // 000cc

// async / await