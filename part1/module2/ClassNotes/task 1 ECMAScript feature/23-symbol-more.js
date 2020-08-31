// symbol 更多的知识

{
  //正常来讲，symbol是唯一的，那想要获取同一个symbol 怎么做呢？
  // 1 全局变量
  const name = Symbol('name') // 因为 name 存了地址 
  console.log(name); // Symbol(name)
  console.log(name === name); true
  // 2 Symbol.for(string) 参数是string，就算你传的不是，他也会强转
  console.log(Symbol.for('foo') === Symbol.for('foo')); // true
  console.log(Symbol.for(true) === Symbol.for(true)); // true
  console.log(Symbol.for(111) === Symbol.for('111')); // true
}


// Symbol 是不可枚举的所以以下方法都不会迭代他
{
  const obj = {
    name: 'name',
    [Symbol('123')]: 123
  }
  console.log(Object.keys(obj)); // [ 'name' ]
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      const element = obj[key];
      console.log(element);
    }
  }
  const s = JSON.stringify(obj)
  console.log(s); // {"name":"name"}

  // 那想要获取symbol属性呢？
  const r = Object.getOwnPropertySymbols(obj) // 专门用来获取对象里的 symbol 属性，返回数组
  console.log(r); // [ Symbol(123) ]
}



// Symbol 可以用来实现对象的迭代
// Symbol.iterator
{
  const obj = {
    name: 'andy',
    age: 12,
    gender: 'male'
  }

  // 不能用于for of 因为没有迭代属性 TypeError: obj is not iterable
  // for (let it of obj){
  //   console.log(it);  
  // }

  // 给一个对象 obj 添加 Symbol.iterator属性，使他可迭代
  Object.defineProperty(obj, Symbol.iterator, {
    enumerable: false,
    writable: false,
    configurable: true,
    value: function () { // 值是一个函数
      const o = this;
      // const keys = Reflect.ownKeys(o) // 这个可以迭代所有的属性，包括不可迭代的属性，也就是Symbol.iterator
      const keys = Object.keys(o)
      console.log(keys);
      let index = 0
      return { // 返回一个迭代对象
        next() {  // 迭代对象有个方法next
          return {  // next方法返回结果对象
            value: o[keys[index++]],
            done: index > keys.length
          }
        }
      }
    }
  })

  for (const it of obj) {
    console.log(it);
  }

  const it = obj[Symbol.iterator]()
  console.log(it.next());
  console.log(it.next());
  console.log(it.next());
  console.log(it.next());
  console.log(it.next());

}





