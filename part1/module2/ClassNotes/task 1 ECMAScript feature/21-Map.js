// map 

{
  // 先看看正常对象是啥样的

  const obj = {} // 对象里的 key 都是字符串
  obj[true] = 'v'
  obj[{}] = 'v'

  console.log(obj);
  console.log(Reflect.ownKeys(obj));
  console.log(Object.keys(obj));

}


{
  const m = new Map()
  m.set(true, 'true')
  m.set({}, 'obj')
  m.set(function () { }, 'function')
  m.set(NaN, 'nnnn')

  // m[NaN] = 'nnnn'

  console.log(m);
  console.log(Reflect.ownKeys(m));
  console.log(Object.keys(m));

  // 如果用了类似对象的赋值写法，那map内部就会当成对象的赋值来处理了
  // 注意 NaN 如果 换成 m[NaN] = 'nnnn'，那他的 key 就不是 NaN 了 而是 string 形式的 'NaN'

  // 获取
  console.log(m.get(NaN)); // nnnn
   
  // 是否存在
  console.log(m.has(NaN)); // true

  m.delete(true) // 删除
  console.log(m.get(true)); // undefined

  m.clear() // 清空
  console.log(m); // Map(0) {}
}




