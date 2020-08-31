// 什么是浅拷贝? 什么是深拷贝?

/*
浅拷贝就是对象的一层属性进行拷贝，如果是基本数据类型，那就会拷贝过来，如果是子对象，
那就只是拷贝了地址引用，具体的子对象没有进行拷贝

深拷贝就是对对象以及对象的所有子对象进行拷贝。

深拷贝：将 B 对象拷贝到 A 对象中，包括 B 里面的子对象，
浅拷贝：将 B 对象拷贝到 A 对象中，但不包括 B 里面的子对象

Object.assign 是浅拷贝

深拷贝做法：
1、用 JSON.stringify 把对象转成字符串，再用 JSON.parse 把字符串转成新的对象（使用JSON）。
2. 递归拷贝
*/

function deepClone(obj) {
  let objClone = Array.isArray(obj) ? [] : {}
  if (obj && typeof obj === 'object') {
    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        if (obj[key] && typeof obj[key] === 'object') {
          objClone[key] = deepClone(obj[key])
        } else {
          objClone[key] = obj[key]
        }
      }
    }
  }
  return objClone
}

const obj = {
  a:'1',
  b:{
    b1:'2',
    c:{
      c1:'3'
    }
  }
}

const clone = deepClone(obj)
clone.b.b1 = 5
clone.b.c.c1 = 4
console.log(obj);

